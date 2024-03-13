import Post from "../../types/Post";
import PostCard from "./PostCard";

interface PostCardContainerProps {
    posts: Post[];
    errorMessage?: string;
}

function PostCardContainer( {posts, errorMessage} : PostCardContainerProps) {

    if(!posts || posts.length === 0) {
        return <h3>{errorMessage}</h3>
    }


    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map((post: Post) => (
                <li key={post.id}>
                    <PostCard post={post} />
                </li>
                ))}
            </ul>
        </div>
      );
}

export default PostCardContainer;