const {gql} = require('apollo-server');

//schema definition language
const typeDefs = gql`
    type Query {
        quakes: [Quake]!
        quake(id: ID!): Quake
        me: User
    }

    type Quake {
        id: ID!
        location: String
        magnitude: Float
        when: String
    }

    type User {
        id: ID!
        username: String!
        email: String!
        password; String!
        records: [Quake]!
    }

    type Mutation {
        # if false, save failed -- check errors
        saveRecord(recordId: ID!): RecordUpdateResponse!
        # if false, delete failed -- check errors
        deleteRecord(recordId: ID!): RecordUpdateResponse!

        signup(username: String!, email: String!, password: String!): String!
        login(email: String!, password: String!): String!
    }

    type RecordUpdateResponse {
        success: Boolean!
        message: String
        records: [Quake]
    }
`;

module.exports = typeDefs;