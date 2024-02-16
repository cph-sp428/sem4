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
const users = [
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
const Books = [
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
const resolvers = {
    Query: {
        hello: () => "Hello world!",
        users: () => users,
        user: (parent, args, context, info) => {
            return users.find((user) => user.id === args.id);
        },
        books: () => Books,
        book: (parent, args, context, info) => {
            return Books.find((book) => book.id === args.id);
        },
        category: (parent, args, context, info) => {
            return Books.filter((book) => book.category === args.name);
        },
    },
    Mutation: {
        createUser: (_parent, args, _context, _info) => {
            const newUser = {
                id: String(users.length + 1),
                name: args.name,
                email: args.email,
                age: args.age,
            };
            users.push(newUser);
            return newUser;
        },
        createBook: (_parent, args, _context, _info) => {
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
        updateBook: (_parent, args, _context, _info) => {
            const book = Books.find((book) => book.id === args.id);
        }
    },
};
export { typeDefs, resolvers };
