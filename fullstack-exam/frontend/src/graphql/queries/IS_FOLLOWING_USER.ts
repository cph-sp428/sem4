import { gql } from "@apollo/client";

export const IS_FOLLOWING_USER = gql`
  query IsFollowingUser(
    $token: String!
    $username: String!
    $usernameToFollow: String!
  ) {
    isFollowingUser(
      token: $token
      username: $username
      usernameToFollow: $usernameToFollow
    ) {
      isFollowing
    }
  }
`;
