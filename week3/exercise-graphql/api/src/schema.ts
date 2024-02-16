import data from './data.ts';
import { User, Book, Person, Address } from "./types.ts";


const users: User[] = data.users;
const books: Book[] = data.books;
const persons: Person[] = data.persons;
const addresses: Address[] = data.addresses;

const typeDefs = `#graphql 
type Query {
    hello: String
    users: [User]
    user: User
    book: Book
    books: [Book]
    category(name:String!): [Book]
    persons: [Person]
    addresses: [Address]
}
type Mutation {
    createUser(name: String!, email: String!, age: Int): User
    createBook(title: String!, author: String!, publishedDate: String!, category: String!, rating: Int): Book
    updateBook(id: ID!, title: String, author: String, publishedDate: String, category: String, rating: Int): Book
}
type User {
    id: ID!
    name: String!
    email: String!
    age: Int
}
type Book{
    id: ID!
    title: String!
    author: String!
    publishedDate: String!
    category: String!
    rating: Int
}
type Person {
    id: ID!
    name: String!
    email: String!
    age: Int
    address: Address!
}
type Address {
    id: ID!
    city: String!
    country: String!
    postalCode: Int!
    persons: [Person!]
}

`;


const resolvers = {
  Query: {
    hello: () => "Hello world!",
    users: () => users,
    user: (parent: any, args: any, context: any, info: any) => {
      return users.find((user) => user.id === args.id);
    },
    books: () => books,
    book: (parent: any, args: any, context: any, info: any) => {
      return books.find((book) => book.id === args.id);
    },
    category: (parent: any, args: any, context: any, info: any) => {
      return books.filter((book) => book.category === args.name);
    },
    persons: () => persons,
    addresses: () => addresses,
  },
  Mutation: {
    createUser: (_parent: never, args: User, _context: never, _info: never) => {
      const newUser = {
        id: String(users.length + 1),
        name: args.name,
        email: args.email,
        age: args.age,
      };
      users.push(newUser);
      return newUser;
    },
    createBook: (_parent: never, args: Book, _context: never, _info: never) => {
      const newBook = {
        id: books.length + 1,
        title: args.title,
        author: args.author,
        publishedDate: args.publishedDate,
        category: args.category,
        rating: args.rating,
      };
        books.push(newBook);
        return newBook;
    },
    updateBook: (_parent: never, args: Book, _context: never, _info: never) => {
        const book = books.find((book) => book.id === args.id);
        
    }
  },
};

export { typeDefs, resolvers };