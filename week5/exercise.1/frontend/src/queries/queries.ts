import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query {
    tasks {
      id
      title
      description
      completed
    }
  }
`;

export const GET_TASK = gql`
  query task($id: ID!) {
    task(id: $id) {
      id
      title
      description
      completed
    }
  }
`;