export const typeDefs = `#graphql
    type Query {
        tasks: [Task]
        task(id: ID!): Task
    }

    type Mutation {
        addTask(title: String!, description: String!, dueDate: String!): Task
        editTask(id: ID!, title: String!, description: String!, dueDate: String!): Task
        deleteTask(id: ID!): Task
    }

    type Task {
        id: ID!
        title: String!
        description: String!
        dueDate: String!
        completed: Boolean!
    }

    `;
