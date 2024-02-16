import { useState } from "react";
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $author: String!
    $publishedDate: String!
    $category: String!
    $rating: Int
  ) {
    createBook(
      title: $title
      author: $author
      publishedDate: $publishedDate
      category: $category
      rating: $rating
    ) {
      title
      author
      publishedDate
      category
      rating
    }
  }
`;

function App() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishedDate: "",
    category: "",
    rating: 0,
  });

  const [addBook, addBookResponse] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleAddBook = () => {
    addBook({
      variables: {
        title: book.title,
        author: book.author,
        publishedDate: book.publishedDate,
        category: book.category,
      },
    });
    setBook({
      title: "",
      author: "",
      publishedDate: "",
      category: "",
      rating: 0,
    });
  };

  const { loading, error, data } = useQuery(GET_BOOKS);
  if (loading || addBookResponse.loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return (
    <div>
      <h1>Books</h1>
      <ul>
        {data.books.map((book: any) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
      TITLE:
      <input
        type="text"
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
      />
      AUTHOR:
      <input
        type="text"
        value={book.author}
        onChange={(e) => setBook({ ...book, author: e.target.value })}
      />
      PUBLISHED DATE:
      <input
        type="text"
        value={book.publishedDate}
        onChange={(e) => setBook({ ...book, publishedDate: e.target.value })}
      />
      CATEGORY:{" "}
      <input
        type="text"
        value={book.category}
        onChange={(e) => setBook({ ...book, category: e.target.value })}
      />
      RATING:{" "}
      <input
        type="number"
        value={book.rating}
        onChange={(e) => setBook({ ...book, rating: parseInt(e.target.value) })}
      />
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
}

export default App;
