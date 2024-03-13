import { gql } from "@apollo/client";

export const GET_POSTS_BY_USERNAME = gql`
  query Query($username: String) {
    postsByUsername(username: $username) {
      id
      picUrl
      description
      createdAt
      likes {
        id
      }
      comments {
        id
        text
        createdAt
      }
      likes {
        id
      }
    }
  }
`;
