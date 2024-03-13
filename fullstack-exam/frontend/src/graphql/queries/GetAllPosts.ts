import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    getAllPosts {
      id
      picUrl
      description
      createdAt
      user {
        username
      }
      comments {
        id
        text
      }
      likes {
        id
      }
    }
  }
`;
