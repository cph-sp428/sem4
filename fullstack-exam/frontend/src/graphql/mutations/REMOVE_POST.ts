import { gql } from "@apollo/client";

export const REMOVE_POST = gql`
  mutation removePost($postId: String!) {
    removePost(postId: $postId) {
      id
    }
  }
`;