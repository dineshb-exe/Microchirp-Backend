const client = require("./../db");

async function comment(request,response){
    const commenter_id = request.payload.user_id;
    const blog_id = request.payload.blog_id;
    const comment_content = request.payload.comment_content;
    const insertQuery = `
    INSERT INTO Comments (user_id,blog_id,comment_content)
    VALUES ($1,$2,$3)
    `;
    const values = [commenter_id,blog_id,comment_content];
    try {
        await client.query(insertQuery,values);
        console.log("Comment Entered successfully");
        return {
            "status": "Success",
            "message": "Comment Posted"
        };
    } catch (err) {
        console.error("DB Error: ",err);
        return {
            "status": "Failure",
            "message": err
        };
    }
}
module.exports = comment;