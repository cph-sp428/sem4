import { gql } from "@apollo/client";

export const SEARCH_POSTS = gql`
  query SearchPosts($searchCriteria: String!) {
    searchPosts(searchCriteria: $searchCriteria) {
      id
      user {
        id
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
  }
`;
