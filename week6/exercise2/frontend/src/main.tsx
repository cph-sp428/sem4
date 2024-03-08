import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PetViewComponent from "./components/PetViewComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PetViewComponent />,


    ErrorBoundary: () => <h1>404 Not Found</h1>,
  }
]);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
