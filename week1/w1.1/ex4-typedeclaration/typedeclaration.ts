// typeDeclaration.ts
import axios from 'axios';

// Define the type or interface for the user object
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  // Add other properties as needed
}

// Function to log user information
function logUserInfo(user: User): void {
  console.log(`Name: ${user.name}`);
  console.log(`Username: ${user.username}`);
  console.log(`Email: ${user.email}`);
  // Log other properties as needed
}

// Make GET requests using axios
axios.get('https://jsonplaceholder.typicode.com/users/1')
  .then((response: any) => {
    // Handle the response for the single user request
    const user: User = response.data;
    logUserInfo(user);
  })
  .catch((error: any) => {
    console.error('Error making request:', error);
  });

axios.get('https://jsonplaceholder.typicode.com/users')
  .then((response: any) => {
    // Handle the response for the array of user objects request
    const users: User[] = response.data;
    users.forEach((user) => {
      logUserInfo(user);
      console.log('---'); // Separator between user information
    });
  })
  .catch((error: any) => {
    console.error('Error making request:', error);
  });
