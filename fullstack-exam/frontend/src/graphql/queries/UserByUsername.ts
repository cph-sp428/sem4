import { gql } from "@apollo/client";

export const GET_USER_BY_USERNAME = gql`
  query UserByUsername($username: String!) {
    userByUsername(username: $username) {
      id
      username
      email
      roles
      posts {
        id
      }
      following {
        id
      }
      followers {
        id
        username
      }
    }
  }
`;
