import { gql } from '@apollo/client';

export const ADD_TASK = gql`
    mutation AddTask($title: String!, $description: String!, $dueDate: String!) {
        addTask(title: $title, description: $description, dueDate: $dueDate) {
        id
        title
        description
        dueDate
        completed
        }
    }
`;

export const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id) {
        id
        }
    }
`;

export const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID!, $title: String!, $description: String!, $dueDate: String!, $completed: Boolean!) {
        updateTask(id: $id, title: $title, description: $description, dueDate: $dueDate, completed: $completed) {
        id
        title
        description
        dueDate
        completed
        }
    }
`;