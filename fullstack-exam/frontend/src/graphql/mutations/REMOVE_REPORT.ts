import { gql } from "@apollo/client";

export const REMOVE_REPORT = gql`
  mutation removeReport($token: String!, $postId: String!) {
    removeReport(token: $token, postId: $postId) {
      id
    }
  }
`;