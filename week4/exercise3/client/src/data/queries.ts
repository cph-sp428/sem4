import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  query {
    people {
      id
      name
      email
      age
      addresses {
        id
        street
        city
        state
        zip
      }
    }
  }
`;

export const GET_ADDRESSES = gql`
  query {
    addresses {
      id
      street
      city
      state
      zip
      people {
        id
        name
        email
        age
      }
    }
  }
`;
