import { Book, Category } from "./data";
import { books, categories } from "./data";

const typeDefs = `#graphql 
type Query {
    books: [Book]
    book(id: ID!): Book
    category(name: String!): Category
    booksByCategory(name: String!): [Book]
}

type Mutation {
    createBook(title: String!, author: String!, publishedDate: String!, category: String!, rating: Int!): Book
}

type Book {
    id: ID!
    title: String!
    author: String!
    publishedDate: String!
    rating: Float!
    category: Category
}

type Category {
    id: ID!
    name: String!
}
`;


const resolvers = {
  Query: {
    books: (_parent: never, args: { id: string }, context: { books: Book[]}, info: any) => context.books,
    book: (_parent: never, args: { id: string }, context: Book[], info: any) => {
      return context.find((book) => book.id === args.id);
    },
    category: (
      _parent: never,
      args: { name: string },
      context: any,
      info: any
    ) => {
      return categories.find((category) => category.name === args.name);
    },
    booksByCategory: (
      _parent: never,
      args: { name: string },
      context: any,
      info: any
    ) => {
      return books.filter((book) => book.category.name === args.name);
    },
  },
  Mutation: {
    createBook: (
      _parent: never,
      args: {
        title: string;
        author: string;
        publishedDate: string;
        category: string;
        rating: number;
      },
      context: any,
      info: any
    ) => {
        const newBook: Book = {
            id: (books.length + 1).toString(),
            title: args.title,
            author: args.author,
            publishedDate: args.publishedDate,
            category: categories.find((category) => category.name === args.category) as Category,
            rating: args.rating,
        };
        books.push(newBook);
        return newBook;
    },
  },
};
export { typeDefs, resolvers };
