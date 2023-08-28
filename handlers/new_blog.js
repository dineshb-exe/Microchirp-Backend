const client = require("./../db");
const validateToken = require("./validate_token");
async function newBlog(request,response){
    if(await validateToken(request,response)==true){
        const user_id = request.payload.user_id;
        const blog_content = request.payload.blog_content;
        const insertQuery = `
        INSERT INTO Blogs (user_id, blog_content)
        VALUES ($1, $2);
        `;
        const values = [user_id,blog_content];

        try {
            await client.query(insertQuery,values);
            console.log("Records inserted successfully");
            return {
                "status": "Success",
                "message": "Blog Posted"
            };
        } catch (err) {
            console.error("DB error: ",err);
            return {
                "status": "Failure",
                "message": err
            };   
        }
    }
    else{
        return {
            "status": "Failure",
            "message": "Sign-in again"
        };
    }
}
module.exports = newBlog;