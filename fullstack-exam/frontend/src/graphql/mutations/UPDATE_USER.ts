import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
    mutation updateUser($user: User!) {
        updateUser(user: $user) {
            id
            username
            password
            email
            roles
        }
    }
`;
