// async function handlerfun(request,response){
//     return await(`Hello ${request.params.name}`);
// }
const client = require("./db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

client.connect();
async function login(request,response){
    const username = request.payload.username;
    const {rows} = await client.query(`SELECT * FROM USERS WHERE username = $1`,[username]);
    if(rows.length==0){
        console.log("No such user");
    }
    else{
        try{
            const password = request.payload.password;
            // console.log(rows[0]['password']);
            const isMatched = bcrypt.compareSync(password,rows[0]['password']);
            if(isMatched){
                const token = generateToken(username);
                return `
                    "JWT": ${token},
                    "user_id": ${rows[0]['user_id']}
                `;            
            }
            else{
                return "Error";
            }
        }
        catch(err){
            console.log("Error comparing passwords: ",err);
            return false;
        }
    }
}
function generateToken(username,res){
    const payload = { username: username};
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, secretKey);
    
    return token;
}
async function validateToken(request,response){
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    try{
        const token = await request.headers.token_header_key;
        const verified = jwt.verify(token,jwtSecretKey);
        console.log(verified);
        return true;
    }
    catch (err){
        console.error("Encountered an error: ",err);
        if(err="JsonWebTokenError: invalid signature")
        return false;
    }
}
// async function newBlog(request,response){
//     if(await validateToken(request,response)==true){
//         const user_id = request.payload.user_id;
//         const blog_content = request.payload.blog_content;
//         const insertQuery = `
//         INSERT INTO Blogs (user_id, blog_content)
//         VALUES ($1, $2);
//         `;
//         const values = [user_id,blog_content];
//         await client.query(insertQuery,values,(err,rows)=>{
//             if(err){
//                 console.error("DB error: ",err);
//                 return `{
//                     "status": "Failure",
//                     "message": ${err}
//                 }`;
//             }
//             console.log("Records inserted successfully");
//             return `{
//                 "status": "Success",
//                 "message": "Blog Posted"
//             }`;
//         });
//     }
//     else{
//         return "Go back to sign in page";
//     }
// }
module.exports = {
    login,
    newBlog
};