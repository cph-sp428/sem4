import { gql } from "@apollo/client";

export const GET_RELEVANT_POSTS = gql`
  query RelevantPostsByUsername($username: String!) {
    relevantPostsByUsername(username: $username) {
      id
      user {
        username
      }
      picUrl
      description
      createdAt
      likes {
        id
      }
      comments {
        id
        username
        text
        createdAt
      }
    }
    # relevantPostsByUsername(username: $username) {
    #   id
    #   user {
    #     id
    #     username
    #     password
    #     email
    #     roles
    #   }
    #   picUrl
    #   description
    #   createdAt
    #   likes {
    #     id
    #   }
    #   comments {
    #     id
    #     username
    #     text
    #     createdAt
    #   }
  }
`;
