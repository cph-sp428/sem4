export const typeDefs = `#graphql 
type Query {
    hello: String
    users: [User]
    user: User
    book: Book
    books: [Book]
    category(name:String!): [Book]
    person(id: ID!): Person
    persons: [Person]
    addresses: [Address]
    addressesByZipCode(zipCode: Int!): [Address]
}
type Mutation {
    createUser(name: String!, email: String!, age: Int): User
    createBook(title: String!, author: String!, publishedDate: String!, category: String!, rating: Int): Book
    updateBook(id: ID!, title: String, author: String, publishedDate: String, category: String, rating: Int): Book
    createPerson(name: String!, email: String!, age: Int): Person
    createAddress(city: String!, country: String!, postalCode: Int): Address
    addPersonToAddress(personId: ID!, addressId: ID!): Address
    removePersonFromAddress(personId: ID!, addressId: ID!): Address
    deletePerson(id: ID!): Person
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
    addresses: [Address]!
}
type Address {
    id: ID!
    city: String!
    country: String!
    postalCode: Int!
    persons: [Person]!
}
`;