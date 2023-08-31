const { server } = require('@hapi/hapi');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function validateToken(request,response){
    excludedRoutes = ['/login'];
    if(!(excludedRoutes.includes(request.route.path))){
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        try{
            const token = await request.headers.token_header_key;
            const verified = jwt.verify(token,jwtSecretKey);
            console.log(verified);
        }
        catch (err){
            console.error("Encountered an error: ",err);
            return false;
        }
    }
    return response.continue;
}
module.exports = {
    name: "validateToken",
    register: (server,options)=>{
        server.ext('onPreHandler',validateToken);
    },
};