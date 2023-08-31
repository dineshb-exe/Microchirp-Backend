const client = require("./../db");
const bcrypt = require('bcrypt');
const generateToken = require("./generate_token");
require('dotenv').config();

async function login(request,response){
    const username = request.payload.username;
    const {rows} = await client.query(`SELECT * FROM USERS WHERE username = $1`,[username]);
    if(rows.length==0){
        console.log("No such user");
        return {
            "status": "Failure",
            "message": "No such user"
        };
    }
    else{
        try{
            const password = request.payload.password;
            // console.log(rows[0]['password']);
            const isMatched = bcrypt.compareSync(password,rows[0]['password']);
            if(isMatched){
                const token = generateToken(rows[0]['user_id']);
                return {
                    "status": "Success",
                    accesstoken :token,
                    user_id: rows[0]['user_id']
                };        
            }
            else{
                return {
                    "status": "Failure",
                    "message": "Wrong Password"
                };
            }
        }
        catch(err){
            console.log("Error comparing passwords: ",err);
            return false;
        }
    }
}
module.exports = login;