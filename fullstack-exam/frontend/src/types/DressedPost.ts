import Post from "./Post";

type DressedPost = Post & {
    numberOfLikes: number;
    numberOfComments: number;
};

export default DressedPost;