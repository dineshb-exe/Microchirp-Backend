const client = require("./../db");

async function fetchBlogs(request,response){
    const substring = request.query.substring;
    const user_id = request.query.user_id;
    if(substring!=""){
        const newSubstring = '%' + substring + '%';
        const fetchQuery = `
        SELECT * FROM blogs_view3
        where blog_content LIKE $1 and uploaded_at >= NOW() - INTERVAL '48 hours'
        ORDER BY uploaded_at DESC limit 10;
        `;
        const values1 = [newSubstring];
        try {
            const { rows } = await client.query(fetchQuery,values1);
            console.log("Blogs fetched successfully");
            return rows;
            
        } 
        catch (err) {
            console.error("DB errorA: ",err);
        }
    }
    else if(user_id!=""){
        const likeFlag = request.query.like_flag;
        console.log(likeFlag);
        if(likeFlag=="false"){
            const fetchQuery2 = `
            SELECT * FROM blogs_view3
            where user_id = $1
            ORDER BY uploaded_at DESC;
            `;
            const values2 = [user_id];
            try {
                const { rows } = await client.query(fetchQuery2,values2);
                console.log("Blogs fetched successfully");
                return {
                    "status": "Success",
                    "data": rows
                };
                
            } catch (err) {
                console.error("DB errorB: ",err);
                return {
                    "status": "Failure",
                    "message": err
                };
            }
        }
        else{
            const fetchQuery2 = `
            SELECT *                  
            FROM blogs_view3
            WHERE blog_id = ANY (SELECT unnest(likes) FROM users WHERE user_id = $1);
            `;
            const values2 = [user_id];
            try {
                const { rows } = await client.query(fetchQuery2,values2);
                console.log("Liked blogs fetched successfully");
                return {
                    "status": "Success",
                    "data": rows
                };
                
            } catch (err) {
                console.error("DB errorB: ",err);
                return {
                    "status": "Failure",
                    "message": err
                };
            }
        }
    }
    else{
        const fetchQuery3 = `
        SELECT * FROM blogs_view3
        where uploaded_at >= NOW() - INTERVAL '48 hours'
        ORDER BY uploaded_at DESC;
        `;
        const values3 = [request.query.time_stamp];
        try {
            const { rows } = await client.query(fetchQuery3);
            console.log("Blogs fetched successfully");
            return {
                "status": "Success",
                "data": rows
            };
            
        } catch (err) {
            console.error("DB errorC: ",err);
            return {
                "status": "Failure",
                "message": err
            };
        }
    }
}
module.exports = fetchBlogs;