import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $token: String!
    $userId: String!
    $username: String!
    $password: String!
    $email: String!
  ) {
    updateUser(
      token: $token
      userId: $userId
      username: $username
      password: $password
      email: $email
    ) {
      id
    }
  }
`;
