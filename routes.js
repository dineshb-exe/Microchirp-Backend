const methods = require("./handlers.js");
const routes = [{
    method: 'POST',
    path: '/login',
    handler: methods.login
},{
    method: 'POST',
    path: '/newBlog',
    handler: methods.newBlog
}];
module.exports = routes;