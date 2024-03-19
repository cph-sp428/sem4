import { gql } from "@apollo/client";

export const GET_USER_BY_USERNAME = gql`
  query UserByUsername($token: String!, $username: String!) {
    userByUsername(token: $token, username: $username) {
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
