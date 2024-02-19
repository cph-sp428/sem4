import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  query GetPeople {
    persons {
      id
      name
      email
      age
      addresses {
        id
        city
        country
        postalCode
      }
    }
  }
`;

export const GET_PERSON_DETAILS = gql`
    query GetPersonDetails($id: ID!) {
        person(id: $id) {
        id
        name
        email
        age
        addresses {
            id
            city
            country
            postalCode
        }
        }
    }
    `;
