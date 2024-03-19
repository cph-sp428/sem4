import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../../graphql/queries/GET_ALL_POSTS";
import PostCardContainer from "../posts/PostCardContainer";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/AuthFacade";

function ExplorePage() {
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = useState("");
  const { loading, error, data } = useQuery(GET_ALL_POSTS, {
    variables: { token: getToken() },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    alert("Error: " + error.message);
    navigate("/home");
  }

  return (
    <div id="container">
      <div id="search-bar-container#">
        <input
          id="search-bar"
          type="text"
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
        />
        <Link to={"/search/" + searchCriteria}>
          <button className=" hover: border-green-950">SEARCH</button>
        </Link>
      </div>
      <h1>EXPLORE</h1>
      <PostCardContainer
        posts={data.getAllPosts}
        errorMessage="911 - MASSIVE SERVER ERROR..."
      />
    </div>
  );
}

export default ExplorePage;
