import User from "../../types/User";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_BY_USERNAME } from "../../graphql/queries/GET_USER_BY_USERNAME";
import useAuth from "../../hooks/useAuth";
import { FOLLOW_USER } from "../../graphql/mutations/FOLLOW_USER";
import { Link, useNavigate } from "react-router-dom";
import { GET_ALL_POSTS } from "../../graphql/queries/GET_ALL_POSTS";
import { GET_RELEVANT_POSTS } from "../../graphql/queries/GET_RELEVANT_POSTS";
import { getToken } from "../../utils/AuthFacade";

interface ProfileCardProps {
  username: string | void;
}

function ProfileCard({ username }: ProfileCardProps) {
  const navigate = useNavigate();
  const ownUsername = useAuth("user");
  const ownProfile = ownUsername === username;

  const { loading, error, data } = useQuery(GET_USER_BY_USERNAME, {
    variables: { token: getToken() , username: username },
  });

  const [followProfile] = useMutation(FOLLOW_USER, {
    variables: { token: getToken(), username: ownUsername, usernameToFollow: username },
    refetchQueries: [
      { query: GET_ALL_POSTS, variables: { token: getToken() } },
      {
        query: GET_RELEVANT_POSTS,
        variables: { token: getToken(), username: ownUsername },
      },
      { query: GET_USER_BY_USERNAME, variables: { token: getToken() , username: username } },
      { query: GET_USER_BY_USERNAME, variables: { token: getToken(), username: ownUsername } },
    ],
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    alert("Error: " + error.message);
    navigate("/home");
  }

  const user: User = data.userByUsername;

  const isFollowing = user.followers.some(
    (follower) => follower.username === ownUsername
  );

  return (
    <div
      className=" shadow-black shadow-md rounded-lg overflow-hidden"
      id="profile-card-container"
    >
      <img
        className="h-32 w-32 rounded-full mx-auto"
        src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
      />
      <Link to={"/user/" + user.username}>
        <h1 className="text-center text-3xl">{user.username}</h1>
      </Link>
      {/* <p className="text-center text-sm">EMAIL: {user.email}</p> */}
      <p className="text-center text-sm">ROLES: {user.roles.toString()}</p>
      <p className="text-center text-sm"># of POSTS: {user.posts.length}</p>
      <p className="text-center text-sm">
        # of FOLLOWERS: {user.followers.length}
      </p>
      <p className="text-center text-sm">
        # of FOLLOWING: {user.following.length}
      </p>
      <div
        id="profile-buttons-container"
        className="flex justify-around items-center"
      >
        {ownProfile && (
          <>
            <button
              onClick={() => navigate("/editProfile")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate("/createPost")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              New Post
            </button>
          </>
        )}
        {!ownProfile && (
          <>
            <button
              onClick={() => followProfile()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
