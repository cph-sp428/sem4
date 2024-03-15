import { useQuery } from "@apollo/client";
import useAuth from "../../hooks/useAuth";
import { GET_ALL_REPORTED_POSTS } from "../../graphql/queries/GET_ALL_REPORTED_POSTS";
import Post from "../../types/Post";
import { useEffect, useState } from "react";

function AdminPage() {
  const admin = useAuth("admin");

  if (!admin) {
    return (
      <div>
        <h1>Admin Page</h1>
        <p>Only admins can access this page!</p>
      </div>
    );
  }

  const { loading, error, data } = useQuery(GET_ALL_REPORTED_POSTS);

  const handleRemovePost = () => {
    console.log("remove post");
  };
  const handleRemoveReport = () => {
    console.log("remove report");
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error</p>;
  }

  return (
    <div id="admin-page-container">
      <h1 className=" text-center">Admin Page</h1>

      <h2>Reported Posts</h2>
      <div>
        {data.getAllReportedPosts.map((post: Post) => (
          <div key={post.id}>
            <img src={post.picUrl} alt="post" />
            <p>{post.description}</p>
            <p>{post.createdAt.toString()}</p>
            <button
              className=" border-orange-700 bg-orange-500 hover:border-red-700"
              onClick={handleRemovePost}
            >
              Remove Post
            </button>
            <button
              className=" border-emerald-800 bg-green-400"
              onClick={handleRemoveReport}
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
