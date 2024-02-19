import { gql } from "@apollo/client";

export const CREATE_PERSON = gql`
    mutation CreatePerson($name: String!, $email: String!, $age: Int!) {
        createPerson(name: $name, email: $email, age: $age) {
        id
        name
        email
        age
        }
    }
    `;
