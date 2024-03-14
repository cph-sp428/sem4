import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $userId: String!
    $username: String!
    $password: String!
    $email: String!
  ) {
    updateUser(
      userId: $userId
      username: $username
      password: $password
      email: $email
    ) {
      id
    }
  }
`;
