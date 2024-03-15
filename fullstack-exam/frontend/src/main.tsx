import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
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
import Post from "./types/Post";
import { GET_ALL_POSTS } from "./graphql/queries/GetAllPosts";

/*

TODO:                 WORKED:

1. refetchQueries ???
2. ------------------add backend populate methods 
3. ------------------populate the database
4. ------------------implement the like button
5. ------------------implement the numberOfLikes literals
6. ------------------implement the numberOfPosts literals
6. implement grid layout vs column layout
7. ------------------implement the search bar
8. ------------------implement the follow button
9. ------------------implement the register page
10. -----------------implement the createPost page
11. -----------------liked posts -> heart icon
12. -----------------removeLike functionality
13. -----------------implement the admin page
14. ------------------implement the editProfile page

5. ------------------massive bcrypt bug
6. !!!!!! stateful components w/ useContext !!!!!! the big one 
2. !!!!!! implement better authorization (missing backend)
1. bug in logout - navbar
3. fix the error page
4. ------------------fix the nav bar
5. ------------------fix the login page
7. fix unnecessary re-renders
8. implement confirmDialog


*/

const PostContext = React.createContext({
  allPosts: [] as Array<Post>,
  setAllPosts: (posts: Array<Post>) => {},
});

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
        element: <SearchPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
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
