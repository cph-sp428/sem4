import { gql } from "@apollo/client";

export const LIKE_POST = gql`
  mutation LikePost($postId: String!, $username: String!) {
    likePost(postId: $postId, username: $username) {
      id
    }
  }
`;
