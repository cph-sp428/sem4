import { gql } from "@apollo/client";

export const GET_RELEVANT_POSTS = gql`
  query Query($username: String!) {
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
