import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TaskView from "./components/TaskView.tsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <TaskView />
    </ApolloProvider>
  </React.StrictMode>
);
