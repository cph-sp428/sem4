import { gql } from "@apollo/client";

export const GET_USER_BY_USERNAME = gql`
  query User($username: String!) {
    user(username: $username) {
      id
      username
      email
      roles
      posts {
        id
        picUrl
        description
        createdAt
      }
    }
  }
`;
