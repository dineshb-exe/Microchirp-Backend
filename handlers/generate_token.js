const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(user_id,res){
    const payload = { user_id: user_id};
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, secretKey);
    
    return token;
}
module.exports = generateToken;