import { gql } from "@apollo/client";

export const GET_ALL_REPORTED_POSTS = gql`
  query Query($token: String!) {
    getAllReportedPosts(token: $token) {
      id
      picUrl
      description
      createdAt
    }
  }
`;
