import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $password: String!
    $email: String!
  ) {
    addUser(username: $username, password: $password, email: $email) {
      id
    }
  }
`;
