import User from "../../types/User";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_BY_USERNAME } from "../../graphql/queries/UserByUsername";
import useAuth from "../../hooks/useAuth";
import { FOLLOW_USER } from "../../graphql/mutations/FOLLOW_USER";
import { Link, useNavigate } from "react-router-dom";
import { GET_ALL_POSTS } from "../../graphql/queries/GetAllPosts";
import { GET_RELEVANT_POSTS } from "../../graphql/queries/GetRelevantPosts";

interface ProfileCardProps {
  username: string | void;
}

function ProfileCard({ username }: ProfileCardProps) {
  const navigate = useNavigate();
  const ownUsername = useAuth("user");
  const ownProfile = ownUsername === username;

  const { loading, error, data } = useQuery(GET_USER_BY_USERNAME, {
    variables: { username: username },
  });
  

  const [followProfile] = useMutation(FOLLOW_USER, {
    variables: { username: ownUsername, usernameToFollow: username },
    refetchQueries: [
      { query: GET_ALL_POSTS },
      { query: GET_RELEVANT_POSTS, variables: { username: ownUsername } },
      { query: GET_USER_BY_USERNAME, variables: { username: username } },
    ],
  });


  if (loading) return <p>Loading...</p>;
  if (error) throw error;

  const user: User = data.userByUsername;


  const handleEdit = () => {
    navigate("/editProfile");
  };

  const handleFollow = () => {
    followProfile();
  };

  const handleNewPost = () => {
    navigate("/createPost");
  };

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
      <p className="text-center text-sm">EMAIL: {user.email}</p>
      <p className="text-center text-sm">ROLES: {user.roles.toString()}</p>
      {user.posts && (
        <p className="text-center text-sm"># of POSTS: {user.posts.length}</p>
      )}
      {ownProfile && (
        <>
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit Profile
          </button>
          <button
            onClick={handleNewPost}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            New Post
          </button>
        </>
      )}
      {!ownProfile && (
        <>
          <button
            onClick={handleFollow}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            follow/unfollow
          </button>
        </>
      )}
    </div>
  );
}

export default ProfileCard;
