import { useState } from 'react';
import { useAuth } from './hooks/hooks';

function UseAuthComponent() {

    const [user, setUser] = useState({username: '', password: ''})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(useAuth(user.username, user.password));
        alert(useAuth(user.username, user.password));
    };


    return ( 
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={user.username} onChange={handleChange} />
            <input type="password" name="password" value={user.password} onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
        </>
     );
}

export default UseAuthComponent;