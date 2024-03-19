import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
  mutation FollowUser(
    $token: String!
    $username: String!
    $usernameToFollow: String!
  ) {
    followUser(
      token: $token
      username: $username
      usernameToFollow: $usernameToFollow
    ) {
      id
    }
  }
`;
