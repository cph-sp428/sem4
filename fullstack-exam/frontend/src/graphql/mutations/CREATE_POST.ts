import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation AddPost(
    $username: String!
    $picUrl: String!
    $description: String!
  ) {
    addPost(username: $username, picUrl: $picUrl, description: $description) {
      id
    }
  }
`;
