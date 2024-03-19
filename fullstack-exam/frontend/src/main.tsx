import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
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

1. ------------------refetchQueries ???
2. ------------------add backend populate methods 
3. ------------------populate the database
4. ------------------implement the like button
5. ------------------implement the numberOfLikes literals
6. ------------------implement the numberOfPosts literals
6. ..................implement grid layout vs column layout
7. ------------------implement the search bar
8. ------------------implement the follow button
9. ------------------implement the register page
10. -----------------implement the createPost page
11. -----------------liked posts -> heart icon
12. -----------------removeLike functionality
13. -----------------implement the admin page
14. ------------------implement the editProfile page
15. -----------------unfollow button
16. -----------------remove post functionality
17. -----------------showing the number of followers
18. -----------------showing the number of following
19. -----------------admin having clean up functionality - access through gql playground
20. -----------------follow-unfollow bug
21. -----------------re-implement search bar (in explore page?)
22. .................comment bug in home page

5. ------------------massive bcrypt bug
6. ------------------!!!!!! stateful components w/ useContext? (used refetchQueries)
7. ------------------!!!!!! implement scalable ui (re bug)
2. --------implement better authorization
1. ------------------bug in logout - navbar ????
3. ------------------fix the error page
4. ------------------fix the nav bar
5. ------------------fix the login page
7. fix unnecessary re-renders
8. implement confirmDialog


*/

// const PostContext = React.createContext({
//   allPosts: [] as Array<Post>,
//   setAllPosts: (posts: Array<Post>) => {},
// });

// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

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
        path: "/user/",
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
    ErrorBoundary: ErrorPage,
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
