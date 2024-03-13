import { gql } from "@apollo/client";

export const RELEVANT_POSTS = gql`
query RelevantPostsByUsername($username: String!) {
  relevantPostsByUsername(username: $username) {
    id
    user {
      username
    }
    picUrl
    description
    createdAt
  }
}
`;
