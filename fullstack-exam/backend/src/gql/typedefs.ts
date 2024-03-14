export const typeDefs = `#graphql
    type Query {
        login(username: String!, password: String!) : Token
        getAllPosts: [Post]
        getAllPostsTwo: [Post]
        relevantPostsByUsername(username: String!): [Post]
        postsByUsername(username: String) : [Post]
        userByUsername(username: String!) : User
        searchPosts(searchCriteria: String!) : [Post]
    }

    type Mutation {
        addUser(username: String!, password: String!, email: String!): User
        addPost(username: String!, picUrl: String!, description: String!): Post
        addComment(username: String!, postId: String!, text: String!): Comment
        likePost(postId: String!, username: String!): Post
        followUser(username: String!, usernameToFollow: String!): User
        updateUser(userId: String!, username: String!, password: String!, email: String!): User
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
        username: String!
        post: Post!
        text: String!
        createdAt: String!
    }
    `;
