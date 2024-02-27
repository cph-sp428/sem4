import { useEffect, useState } from 'react';
import { User } from './UserList';

export default function useUserFetch(url: string) {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then((data: User[]) => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return [users];
}