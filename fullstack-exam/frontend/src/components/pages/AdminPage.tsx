import { useMutation, useQuery } from "@apollo/client";
import useAuth from "../../hooks/useAuth";
import { GET_ALL_REPORTED_POSTS } from "../../graphql/queries/GET_ALL_REPORTED_POSTS";
import Post from "../../types/Post";
import { REMOVE_POST } from "../../graphql/mutations/REMOVE_POST";
import { REMOVE_REPORT } from "../../graphql/mutations/REMOVE_REPORT";
import { useNavigate } from "react-router";
import { getToken } from "../../utils/AuthFacade";

function AdminPage() {
  const navigate = useNavigate();
  const admin = useAuth("admin");

  const { loading, error, data } = useQuery(GET_ALL_REPORTED_POSTS, {
    variables: { token: getToken() },
  });

  const [removePost] = useMutation(REMOVE_POST, {
    variables: { token: getToken() },
    refetchQueries: [
      {
        query: GET_ALL_REPORTED_POSTS,
        variables: { token: getToken() },
      },
    ],
  });

  const [removeReport] = useMutation(REMOVE_REPORT, {
    variables: { token: getToken() },
    refetchQueries: [
      {
        query: GET_ALL_REPORTED_POSTS,
        variables: { token: getToken()}
      },
    ],
  });

  if (!admin) {
    return (
      <div>
        <h1>Admin Page</h1>
        <p>Only admins can access this page!</p>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    alert("Error: " + error.message);
    navigate("/home");
  }

  const reportedPosts: Post[] = data.getAllReportedPosts;

  const handleRemovePost = (id: string) => {
    removePost({
      variables: { postId: id },
    });
  };

  const handleRemoveReport = (id: string) => {
    removeReport({
      variables: { postId: id },
    });
  };

  return (
    <div id="admin-page-container">
      <h1 className=" text-center">Admin Page</h1>
      {reportedPosts.length === 0 ? (
        <p>No reported posts</p>
      ) : (
        reportedPosts.map((post: Post) => (
          <div key={post.id}>
            <img src={post.picUrl} alt="post" />
            <p>{post.description}</p>
            <p>{post.createdAt.toString()}</p>
            <button
              className=" border-orange-700 bg-orange-500 hover:border-red-700"
              onClick={() => handleRemovePost(post.id)}
            >
              Remove Post
            </button>
            <button
              className=" border-emerald-800 bg-green-400"
              onClick={() => handleRemoveReport(post.id)}
            >
              Remove Report
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPage;
