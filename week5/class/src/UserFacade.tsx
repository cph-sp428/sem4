import { ReactNode } from 'react';
import useUserFetch from './useUserFetch';
import UserList from './UserList';

function UserFacade() : ReactNode {
    
    const url = 'https://api.example.com/users';
    const [users] = useUserFetch(url);

    return ( 
        <>
            <UserList users={users} />
        </>
     );
}

export default UserFacade;