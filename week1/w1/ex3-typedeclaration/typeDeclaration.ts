import axios from 'axios';

async function fetchUsers() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
}

async function fetchUserById(id: number) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
}

console.log(fetchUsers());
console.log(fetchUserById(1));