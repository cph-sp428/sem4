import { gql } from "@apollo/client";

export const GET_ALL_REPORTED_POSTS = gql`
  query Query {
    getAllReportedPosts {
      id
      picUrl
      description
      createdAt
    }
  }
`;
