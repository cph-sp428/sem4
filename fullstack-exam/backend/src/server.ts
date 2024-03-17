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
  if (req.body.operationName === "Login" || req.path === "Register") {
    console.log("allowing anonymous"); //TODO: Fjern denne
    return next();
  }
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
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
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
