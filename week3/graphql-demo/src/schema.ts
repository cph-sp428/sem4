const typeDefs = `#graphql 
type Query {
    hello: String
    users: [User]
    user: User
    book: Book
    books: [Book]
    category(name:String!): [Book]
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
`;
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

type User = {
  id: string;
  name: string;
  email: string;
  age: number;
};

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

type Book = {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  category: string;
  rating: number;
};

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    users: () => users,
    user: (parent: any, args: any, context: any, info: any) => {
      return users.find((user) => user.id === args.id);
    },
    books: () => Books,
    book: (parent: any, args: any, context: any, info: any) => {
      return Books.find((book) => book.id === args.id);
    },
    category: (parent: any, args: any, context: any, info: any) => {
      return Books.filter((book) => book.category === args.name);
    },
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
        id: Books.length + 1,
        title: args.title,
        author: args.author,
        publishedDate: args.publishedDate,
        category: args.category,
        rating: args.rating,
      };
        Books.push(newBook);
        return newBook;
    },
    updateBook: (_parent: never, args: Book, _context: never, _info: never) => {
        const book = Books.find((book) => book.id === args.id);
        
    }
  },
};

export { typeDefs, resolvers };
