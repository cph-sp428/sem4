import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation AddPost(
    $token: String!
    $username: String!
    $picUrl: String!
    $description: String!
  ) {
    addPost(
      token: $token
      username: $username
      picUrl: $picUrl
      description: $description
    ) {
      id
    }
  }
`;
