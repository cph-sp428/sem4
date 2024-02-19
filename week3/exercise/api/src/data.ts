import { User, Book, Person, Address } from "./types.ts";

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

const books: Book[] = [
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

const address1: Address = {
  id: 1,
  city: "New York",
  country: "USA",
  postalCode: 10001,
  persons: []
};

const address2: Address = {
    id: 2,
    city: "Los Angeles",
    country: "USA",
    postalCode: 90001,
    persons: []
};

const persons: Person[] = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@email.com",
    age: 25,
    addresses: [address1]
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "janedoe@email.com",
    age: 30,
    addresses: [address2]
  }
];

const addresses: Address[] = [
  {...address1, persons: [persons[0]]}
  ,{...address2, persons: [persons[1]]}
];

export default {
  users,
  books,
  persons,
  addresses
};
