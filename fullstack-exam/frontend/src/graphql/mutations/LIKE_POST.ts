import { gql } from "@apollo/client";

export const LIKE_POST = gql`
  mutation LikePost($token: String!, $postId: String!, $username: String!) {
    likePost(token: $token, postId: $postId, username: $username) {
      id
    }
  }
`;
