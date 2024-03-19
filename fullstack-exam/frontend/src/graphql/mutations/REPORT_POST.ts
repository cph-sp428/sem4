import { gql } from "@apollo/client";

export const REPORT_POST = gql`
  mutation ReportPost($token: String!, $postId: String!) {
    reportPost(token: $token, postId: $postId) {
      id
    }
  }
`;
