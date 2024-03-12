export const typeDefs = `#graphql
    type Query {
        login(username: String!, password: String!) : Token
        users: [User]
        user(username: String!): User
        posts: [Post]
        postsByUserId(id: ID!): [Post]
        relevantPostsByUsername(username: String!): [Post]
        comments: [Comment]
        commentsByPostId(id: ID!): [Comment]
    }

    type Mutation {
        addUser(username: String!, password: String!, email: String!): User
        addPost(user: ID!, picUrl: String!, description: String!): Post
        addComment(user: ID!, post: ID!, text: String!): Comment
    }

    type Token {
        token: String
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
        relevantPosts: [Post]
    }

    type UserDto {
        username: String!
        roles: [String]
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
