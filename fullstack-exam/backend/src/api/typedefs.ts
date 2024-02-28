export const typeDefs = `#graphql
    type Query {
        users: [User]
        posts: [Post]
        comments: [Comment]

    }

    type Mutation {
        addUser(username: String!, password: String!, email: String!): User
        addPost(user: ID!, picUrl: String!, description: String!): Post
        addComment(user: ID!, post: ID!, text: String!): Comment
    }

    type User {
        id: ID!
        username: String!
        password: String!
        email: String!
        roles: [String]
        posts: [Post]
        following: [User]
        followers: [User]
    }

    type Post {
        id: ID!
        user: User!
        picUrl: String!
        description: String!
        createdAt: String!
        likes: [User]
        comments: [Comment]
    }

    type Comment {
        id: ID!
        user: User!
        post: Post!
        text: String!
        createdAt: String!
    }
    `;
