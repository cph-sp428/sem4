import Post from "../../types/Post";

interface PostCardGridContainerProps {
    posts : Post[];
}

function PostCardGridContainer({posts}: PostCardGridContainerProps) {
    return ( 
        <div id="grid-container">
            <ul className=" grid grid-cols-3 ">
                {posts.map((post: Post) => (
                    <li className=" rounded-lg ">
                        <img 
                        src={post.picUrl} 
                        className=" rounded-bl-2xl"
                        height={300}
                        width={300}
                        />
                    </li>
                ))}
            </ul>
        </div>
     );
}

export default PostCardGridContainer;