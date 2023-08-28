const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(username,res){
    const payload = { username: username};
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, secretKey);
    
    return token;
}
module.exports = generateToken;