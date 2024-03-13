import { gql } from "@apollo/client";

export const POST_COMMENT = gql`
mutation AddComment($username: String!, $text: String!, $postId: String!) {
  addComment(username: $username, text: $text, postId: $postId) {
    id
  }
}
`;
