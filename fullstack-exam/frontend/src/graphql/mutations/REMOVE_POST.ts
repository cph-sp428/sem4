import { gql } from "@apollo/client";

export const REMOVE_POST = gql`
  mutation removePost($token: String!, $postId: String!) {
    removePost(token: $token, postId: $postId) {
      id
    }
  }
`;