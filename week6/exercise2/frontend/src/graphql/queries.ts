import { gql } from "@apollo/client";

export const GET_ALL_PETS = gql`
  query{
    getAllPets {
      id
      name
      species
      age
      owner {
        id
        name
        age
      }
    }
  }
`;
