import { useMutation, useQuery } from "@apollo/client";
import useAuth from "../../hooks/useAuth";
import { GET_ALL_REPORTED_POSTS } from "../../graphql/queries/GET_ALL_REPORTED_POSTS";
import Post from "../../types/Post";
import { useEffect, useState } from "react";
import { REMOVE_POST } from "../../graphql/mutations/REMOVE_POST";
import { REMOVE_REPORT } from "../../graphql/mutations/REMOVE_REPORT";

function AdminPage() {
  
  const admin = useAuth("admin");

  const { loading, error, data } = useQuery(GET_ALL_REPORTED_POSTS);

  const [removePost] = useMutation(REMOVE_POST);

  const [removeReport] = useMutation(REMOVE_REPORT);

  const [reportedPosts, setReportedPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (data) {
      setReportedPosts(data.getAllReportedPosts);
    }
  }, [loading]);

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
    return <p>Error</p>;
  }

  const handleRemovePost = (id: string) => {
    removePost({
      variables: { postId: id },
    });
    setReportedPosts(reportedPosts.filter((post) => post.id !== id));
  };

  const handleRemoveReport = (id: string) => {
    removeReport({
      variables: { postId: id },
    });
    setReportedPosts(reportedPosts.filter((post) => post.id !== id));
  };

  return (
    <div id="admin-page-container">
      <h1 className=" text-center">Admin Page</h1>
      <div>
        {reportedPosts.map((post: Post) => (
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
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
