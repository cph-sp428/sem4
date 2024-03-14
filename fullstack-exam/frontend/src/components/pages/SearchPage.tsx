import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import PostCard from "../posts/PostCard";
import { SEARCH_POSTS } from "../../graphql/queries/SEARCH_POSTS";
import Post from "../../types/Post";

function SearchPage() {

    const searchCritera = useParams();
    console.log(searchCritera);

    const { loading, error, data } = useQuery(SEARCH_POSTS, {
        variables: searchCritera
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR: {error.message}</p> ;

    const posts = data.searchPosts;

    if(!posts || posts.length === 0) return (<p>No posts found</p>);

    return ( 
        <div id="search-page-container">
            <h1>Search Page</h1>
            {posts.map((post : Post) => {
                return (
                    <PostCard key={post.id} post={post} />
                );
            })}
        </div>
     );
}

export default SearchPage;