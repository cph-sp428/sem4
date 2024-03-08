export function useAuth(username: string, password: string) {
  const users = [
    {
      username: "admin",
      password: "password",
    },
    {
      username: "admin2",
      password: "password2",
    },
  ];

  let currentUser = { username: "", password: "" };

  const logout = () => {
    currentUser = { username: "", password: "" };
  };

  const login = (username: string, password: string) => {
    if (
      users.some(
        (user) => user.username === username && user.password === password
      )
    ) {
      currentUser = { username: username, password: password };
    }
    return [currentUser, logout];
  };
}
