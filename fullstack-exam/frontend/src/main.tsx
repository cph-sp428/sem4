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
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/ProfilePage";
import ErrorPage from "./components/ErrorPage";
import ExplorePage from "./components/ExplorePage";

/*

TODO:
1. fix the glitch that happens when navigating to the profile page from the home page
2. get working data in mongodb
3. fix the error page
4. fix the nav bar
5. fix the login page

*/

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "",
    element: <Navbar />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/user",
        element: <ProfilePage />,
        children: [
          {
            path: "/user/:username",
            element: <ProfilePage />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
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
