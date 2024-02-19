export const typeDefs = `#graphql
    type Query {
        people: [Person]
        addresses: [Address]
        addressesByZipCode(zip: Int!): [Address]
    }

    type Mutation {
        addPerson(name: String!, email: String!, age: Int!): Person
        addAddress(street: String!, city: String!, state: String!, zip: Int!): Address
        addPersonToAddress(personId: ID!, addressId: ID!): Address
        removePersonFromAddress(personId: ID!, addressId: ID!): Address
        deletePerson(id: ID!): Person
    }

    type Person {
        id: ID!
        name: String!
        email: String!
        age: Int!
        addresses: [Address]
    }

    type Address {
        id: ID!
        street: String!
        city: String!
        state: String!
        zip: Int!
        people: [Person]
    }
    `;