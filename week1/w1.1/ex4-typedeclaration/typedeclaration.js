"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// typeDeclaration.ts
var axios_1 = require("axios");
// Function to log user information
function logUserInfo(user) {
    console.log("Name: ".concat(user.name));
    console.log("Username: ".concat(user.username));
    console.log("Email: ".concat(user.email));
    // Log other properties as needed
}
// Make GET requests using axios
axios_1.default.get('https://jsonplaceholder.typicode.com/users/1')
    .then(function (response) {
    // Handle the response for the single user request
    var user = response.data;
    logUserInfo(user);
})
    .catch(function (error) {
    console.error('Error making request:', error);
});
axios_1.default.get('https://jsonplaceholder.typicode.com/users')
    .then(function (response) {
    // Handle the response for the array of user objects request
    var users = response.data;
    users.forEach(function (user) {
        logUserInfo(user);
        console.log('---'); // Separator between user information
    });
})
    .catch(function (error) {
    console.error('Error making request:', error);
});
