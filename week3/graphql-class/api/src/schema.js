"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
var typeDefs = "#graphql\n    type Query {\n        hello: String\n    }\n    ";
exports.typeDefs = typeDefs;
var resolvers = {
    Query: {
        hello: function () { return 'Hello world!'; },
    },
};
exports.resolvers = resolvers;
