const client = require("./db");
const login = require("./handlers/login");
const newBlog = require("./handlers/new_blog");
const like = require("./handlers/like");
const comment = require("./handlers/comment");
const fetchBlogs = require("./handlers/fetch_blogs");

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
},{
    method: 'POST',
    path: '/newComment',
    handler: comment
},{
    method: 'GET',
    path: '/fetchBlogs',
    handler: fetchBlogs
}];
module.exports = routes;