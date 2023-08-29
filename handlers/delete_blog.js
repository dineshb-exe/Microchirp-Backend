const client = require("./../db");

async function deleteBlog(request,response){
    const blog_id = request.query.blog_id;
    const deleteQuery = `
    DELETE FROM Blogs
    WHERE blog_id = $1;
    `;
    const values = [blog_id];
    try {
        await client.query(deleteQuery,values);
        console.log("Blog Deleted");
        return {
            "status": "Success",
            "message": "Record deleted"
        };
    } catch (err) {
        console.error("DB Error: ",err);
        return {
            "status": "Failure",
            "message": err
        }
    }
}
module.exports = deleteBlog;