export const typeDefs = `#graphql
    type Query {
        login(username: String!, password: String!) : Token
        getAllPosts(token: String!): [Post]
        relevantPostsByUsername(token: String!, username: String!): [Post]
        postsByUsername(token: String!,username: String!) : [Post]
        userByUsername(token: String!, username: String!) : User
        searchPosts(token: String!, searchCriteria: String!) : [Post]
        getAllReportedPosts(token: String!): [Post]
        # isFollowingUser(token: String!, username: String!, usernameToFollow: String!): Boolean
    }

    type Mutation {
        addUser(username: String!, password: String!, email: String!): User
        addPost(token: String!, username: String!, picUrl: String!, description: String!): Post
        addComment(token: String!, username: String!, postId: String!, text: String!): Comment
        likePost(token: String!, postId: String!, username: String!): Post
        followUser(token: String!, username: String!, usernameToFollow: String!): User
        updateUser(token: String!, userId: String!, username: String!, password: String!, email: String!): User
        reportPost(token: String!, postId: String!): Post
        removePost(token: String!, postId: String!): Post
        removeReport(token: String!, postId: String!): Post
        removeAllFollowersAndFollowing(someString: String!) : Boolean
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
