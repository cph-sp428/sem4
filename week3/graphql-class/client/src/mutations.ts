import { gql } from '@apollo/client';
export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $url: String!, $category: String!) {
    createBook(title: $title, author: $author, url: $url, category: $category) {
      id
      title
    }
  }
`;