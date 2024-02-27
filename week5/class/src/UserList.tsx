import React from 'react';

export interface User {
    id: number;
    name: string;
}

interface UserListProps {
    users: User[];
}

const UserList : React.FC<UserListProps> = ({users}) => {

    return (
        <div>
          <h2>User List</h2>
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      );
}

export default UserList;