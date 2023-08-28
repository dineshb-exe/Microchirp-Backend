const jwt = require('jsonwebtoken');
require('dotenv').config();

async function validateToken(request,response){
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    try{
        const token = await request.headers.token_header_key;
        const verified = jwt.verify(token,jwtSecretKey);
        console.log(verified);
        return true;
    }
    catch (err){
        console.error("Encountered an error: ",err);
        return false;
    }
}
module.exports = validateToken;