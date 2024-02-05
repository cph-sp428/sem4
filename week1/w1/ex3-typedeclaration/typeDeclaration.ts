import axios from 'axios';

type User = {
    id: string;
    name: string;
    email: string;
};

function logUserInfo(user: User): void {
    console.log('ID: ' + user.id);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
}

axios.get(`https://jsonplaceholder.typicode.com/users/1`)
        .then(response => logUserInfo(response.data));

axios.get(`https://jsonplaceholder.typicode.com/users`)
.then(response => response.data.forEach((user: User) => logUserInfo(user)));