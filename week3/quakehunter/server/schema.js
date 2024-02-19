const { gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        quakes: [Quake]!
        quake(id: ID!): Quake

        #queries for current user
        me: User
    }

    type Quake {
        id: ID!
        location: String
        magnitude: Float
        when: String
        time: String
    }

    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Mutation {
        # if false saving record failed -- check errors
        saveRecords(recordId: ID!): RecordUpdateResponse!

        # if false deleting record failed -- check errors
        deleteRecord(recordId: ID!): RecordUpdateResponse!

        #login token
        login(email: String): String
    }

    type RecordUpdateResponse {
        success: Boolean!
        message: String
        records: [Quake]
    }

`;

module.exports = typeDefs;