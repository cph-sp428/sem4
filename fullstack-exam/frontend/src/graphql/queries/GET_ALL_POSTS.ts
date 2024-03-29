import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPosts($token: String!) {
    getAllPosts(token: $token) {
      id
      user {
        id
        username
        password
        email
        roles
      }
      picUrl
      description
      createdAt
      comments {
        id
        text
        createdAt
        username
      }
      likes {
        id
        username
      }
    }
  }
`;
