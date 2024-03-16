import { gql } from "@apollo/client";

export const IS_FOLLOWING_USER = gql`
  query IsFollowingUser($username: String!, $usernameToFollow: String!) {
    isFollowingUser(username: $username, usernameToFollow: $usernameToFollow) {
      isFollowing
    }
  }
`;
