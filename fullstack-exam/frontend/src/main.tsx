import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  //gql,
} from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/pages/ProfilePage";
import ErrorPage from "./components/pages/ErrorPage";
import ExplorePage from "./components/pages/ExplorePage";
import EditProfilePage from "./components/pages/EditProfilePage";
import RegisterPage from "./components/pages/RegisterPage";
import CreatePostPage from "./components/pages/CreatePostPage";
import SearchPage from "./components/pages/SearchPage";
import AdminPage from "./components/pages/AdminPage";

/*

TODO:                 WORKED:

1. refetchQueries ???
2. add backend populate methods 
3. populate the database
4. ------------------implement the like button
5. ------------------implement the numberOfLikes literals
6. ------------------implement the numberOfPosts literals
6. implement grid layout vs column layout
  - useState boolean isGrid
7. ------------------implement the search bar
8. ------------------implement the follow button
9. ------------------implement the register page
10. -----------------implement the createPost page

1. ------------------bug in logout - navbar
2. implement better authorization (missing backend)
3. fix the error page
4. ------------------fix the nav bar
5. ------------------fix the login page

*/

const router = createBrowserRouter([
  {
    path: "",
    element: <Navbar />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
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
      {
        path: "/editProfile",
        element: <EditProfilePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/createPost",
        element: <CreatePostPage />,
      },
      {
        path: "/search/:searchCriteria",
        element: <SearchPage />
      },
      {
        path: "/admin",
        element: <AdminPage />,
      }
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
