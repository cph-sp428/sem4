import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import { User } from './UserList';

// Component responsible for fetching user data
const UserListContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Simulating data fetching from an API
    fetch('https://api.example.com/users')
      .then(response => response.json())
      .then((data: User[]) => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return <UserList users={users} />;
};

export default UserListContainer;