const client = require("./../db");
const validateToken = require("../plugins/validate_token");

async function like(request,response){
    const user_id = request.payload.user_id;
    const blog_id = request.payload.blog_id;
    try {
        const {rows} = await client.query(`
        SELECT likes
        FROM users
        WHERE user_id = $1;`,[user_id]);
        const likesArray = rows[0]['likes'];
        const isLiked = likesArray.includes(blog_id);
        const values = [blog_id,user_id];
        const values2 = [blog_id];
        if(!isLiked){
            const updateQuery1 = `
            UPDATE users
            SET likes = array_append(likes, $1)
            WHERE user_id = $2;
            `;
            const updateQuery2 = `
            UPDATE blogs
            SET like_count = like_count + 1
            WHERE blog_id = $1;
            `;
            try {
                await client.query(updateQuery1, values);
                await client.query(updateQuery2,values2);
                console.log("Like recorded");
                return {
                    "status": "Success",
                    "message": "Like Recorded"
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
            const updateQuery3 = `
            UPDATE users
            SET likes = array_remove(likes, \$1)
            WHERE user_id = \$2
            RETURNING *;
            `;
            const updateQuery4 = `
            UPDATE blogs
            SET like_count = like_count - 1
            WHERE blog_id = $1;
            `;
            try {
                await client.query(updateQuery3,values);
                await client.query(updateQuery4,values2);
                console.log("Like removed");
                return {
                    "status": "Success",
                    "message": "Like Removed"
                };
            } catch (err) {
                console.error("DB error: ",err);
                return {
                    "status": "Failure",
                    "message": err
                };
            }
        }
    } catch (err) {
        console.error(err);
        return;
    }
}
module.exports = like;