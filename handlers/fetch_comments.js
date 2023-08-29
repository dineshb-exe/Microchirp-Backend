const client = require("./../db");

async function fetchComments(request, response){
    const blog_id = request.query.blog_id;
    const fetchQuery = `
    SELECT * FROM comments_view
    WHERE blog_id = $1;
    `;
    const values = [blog_id];
    try {
        const { rows } = await client.query(fetchQuery,values);
        console.log("Comments fetched successfully");
        return {
            "status": "Success",
            "data": rows
        };
    } catch (err) {
        console.error("DB error: ",err);
        return {
            "status": "Failure",
            "message": err
        };
    }
}
module.exports = fetchComments;