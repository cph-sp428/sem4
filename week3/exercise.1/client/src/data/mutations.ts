import { gql } from "@apollo/client";

export const ADD_PERSON = gql`
    mutation AddPerson($name: String!, $email: String!, $age: Int!) {
        createPerson(name: $name, email: $email, age: $age) {
        id
        name
        email
        age
        }
    }
`;

export const DELETE_PERSON = gql`
    mutation DeletePerson($id: ID!) {
        deletePerson(id: $id) {
        id
        name
        email
        age
        }
    }
`;

export const ADD_ADDRESS = gql`
    mutation AddAddress($street: String!, $city: String!, $state: String!, $zip: String!) {
        createAddress(street: $street, city: $city, state: $state, zip: $zip) {
        id
        street
        city
        state
        zip
        }
    }
`;

export const DELETE_ADDRESS = gql`
    mutation DeleteAddress($id: ID!) {
        deleteAddress(id: $id) {
        id
        street
        city
        state
        zip
        }
    }
`;