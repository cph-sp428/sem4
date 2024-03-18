import { gql } from "@apollo/client";

export const GET_POSTS_BY_USERNAME = gql`
  query Query($username: String) {
    postsByUsername(username: $username) {
      id
      user {
        username
      }
      picUrl
      description
      createdAt
      likes {
        id
      }
      comments {
        id
        username
        text
        createdAt
      }
      likes {
        id
        username
      }
    }
  }
`;
