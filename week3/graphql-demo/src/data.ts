
type User = {
    id: string;
    name: string;
    email: string;
    age: number;
  };
  
type Book = {
    id: number;
    title: string;
    author: string;
    publishedDate: string;
    category: string;
    rating: number;
  };

const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@mail.com",
      age: 25,
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane@mail.com",
      age: 30,
    },
    {
      id: "3",
      name: "John Smith",
      email: "jonny@mail.com",
      age: 35,
    },
  ];
  
  
  const Books: Book[] = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publishedDate: "1925",
      category: "Fiction",
      rating: 4,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publishedDate: "1960",
      category: "Fiction",
      rating: 5,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      publishedDate: "1949",
      category: "Fiction",
      rating: 4,
    },
    {
      id: 4,
      title: "Animal Farm",
      author: "George Orwell",
      publishedDate: "1945",
      category: "Fiction",
      rating: 4,
    },
  ];


  export default {
    users,
    Books
  }