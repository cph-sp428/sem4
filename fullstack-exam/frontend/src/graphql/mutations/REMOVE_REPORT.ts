import { gql } from "@apollo/client";

export const REMOVE_REPORT = gql`
  mutation removeReport($postId: String!) {
    removeReport(postId: $postId) {
      id
    }
  }
`;