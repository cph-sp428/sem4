import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router";
import PostCard from "../posts/PostCard";
import { SEARCH_POSTS } from "../../graphql/queries/SEARCH_POSTS";
import Post from "../../types/Post";

function SearchPage() {

    const navigate = useNavigate();
    const params = useParams();
    console.log(params);

    const { loading, error, data } = useQuery(SEARCH_POSTS, {
        variables: params
    });

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error);
        alert("Error: " + error.message);
        navigate("/home");
    }

    const posts = data.searchPosts;

    return ( 
        <div id="search-page-container">
            <h1>Search Results: '{params.searchCriteria}'</h1>
            {posts.length === 0 && <p>No posts found...</p>}
            {posts.map((post : Post) => {
                return (
                    <PostCard key={post.id} post={post} />
                );
            })}
        </div>
     );
}

export default SearchPage;