import { gql } from "@apollo/client";

export const POST_COMMENT = gql`
  mutation AddComment(
    $token: String!
    $username: String!
    $text: String!
    $postId: String!
  ) {
    addComment(
      token: $token
      username: $username
      text: $text
      postId: $postId
    ) {
      id
    }
  }
`;
