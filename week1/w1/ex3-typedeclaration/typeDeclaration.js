"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
function logUserInfo(user) {
    console.log('ID: ' + user.id);
    console.log("Name: ".concat(user.name));
    console.log("Email: ".concat(user.email));
}
axios_1.default.get("https://jsonplaceholder.typicode.com/users/1")
    .then(function (response) { return logUserInfo(response.data); });
axios_1.default.get("https://jsonplaceholder.typicode.com/users")
    .then(function (response) { return response.data.forEach(function (user) { return logUserInfo(user); }); });
