import { gql } from "@apollo/client";

export const FOLLOW_USER = gql`
  mutation FollowUser($username: String!, $usernameToFollow: String!) {
    followUser(username: $username, usernameToFollow: $usernameToFollow) {
      id
      
    }
  }
`;
