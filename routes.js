const client = require("./db");
const login = require("./handlers/login");
const newBlog = require("./handlers/new_blog");
const like = require("./handlers/like");

client.connect();
const routes = [{
    method: 'POST',
    path: '/login',
    handler: login
},{
    method: 'POST',
    path: '/newBlog',
    handler: newBlog
},{
    method: 'PUT',
    path: '/like',
    handler: like
}];
module.exports = routes;