import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TaskView from "./components/TaskView.tsx";
import NewTask from "./components/NewTask.tsx";
import EditTask from "./components/EditTask.tsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskView />,
    children: [
      {
        path: "/newTask",
        element: <NewTask />,
      },
      {
        path: "/editTask/:id",
        element: <EditTask />,
      }
    ],
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
