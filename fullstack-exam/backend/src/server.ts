import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { MONGODB_URL } from "./config";
import mutations from "./gql/mutations";
import queries from "./gql/queries";
import { typeDefs } from "./gql/typedefs";

await mongoose.connect(MONGODB_URL);

interface MyContext {
  token?: string;
}

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

const jwtMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.body.operationName === 'login' || req.body.operationName === 'addUser') {
    //allowing anonymous users to login and register
    return next();
  }
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

const errorMiddleware = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
  next();
};

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();


app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  //jwtMiddleware,
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.authorization }),
  }),
  errorMiddleware,
);


await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
