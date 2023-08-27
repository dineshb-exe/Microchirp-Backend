const client = require("./db");
const bcrypt = require("bcrypt");

client.connect();
async function insertIntoDb(username, display_title, plainPassword, age, bio, gender, phone_number){
    await bcrypt.hash(plainPassword, 10, async (err,hashedPassword)=>{
        if(err){
            console.error("Error hashing password: ",err);
            return;
        }
        //await client.connect();
        const insertQuery = `
        INSERT INTO users (username, display_title, password, age, bio, gender, phone_number, likes)
        VALUES ($1,$2,$3,$4,$5,$6,$7,'{}');
        `;
        const values = [username,display_title,hashedPassword,age,bio,gender,phone_number];
        await client.query(insertQuery,values,(err,rows)=> {
            if(err){
                console.error("DB error: ",err);
            }
            console.log("Records inserted successfully!!");
        });
    });
}
var age_list = [25,30,22,28,19];
var bio_list = ['Hello, I am User One.', 'I love micro-blogging!','Exploring the online world.','Just a user in a digital world.','Living life to the fullest.'];
var password_list = ['password123','pass456','secureword','abc123','p@ssw0rd'];
var phone_list = ['123-456-7890','987-654-3210','555-123-4567','111-222-3333','444-555-6666'];
var gender_list = ['Male','Female','Female','Male','Female'];
for(i=1;i<6;i++){
    insertIntoDb("user"+i+"@email.com","User"+i,password_list[i-1],age_list[i],bio_list[i-1],gender_list[i-1],phone_list[i-1]);
}
// INSERT INTO users (username, display_title, password, age, bio, gender, phone_number, likes)
// VALUES
//     ('user1', 'User One', 'password123', 25, 'Hello, I am User One.', 'Male', '123-456-7890', ARRAY['c7e8c0b9-6a12-4da7-b7e4-0f2eb96c788f', '9eaf6203-9b18-4a41-8eeb-50a5d82d04f0']),
//     ('user2', 'User Two', 'pass456', 30, 'I love micro-blogging!', 'Female', '987-654-3210', ARRAY['72d08e9b-38d6-4e14-9b5c-7249c43438ce']),
//     ('user3', 'User Three', 'secureword', 22, 'Exploring the online world.', 'Non-binary', '555-123-4567', ARRAY['f53c095c-78fb-4759-8c74-18be4a4853f1', '72d08e9b-38d6-4e14-9b5c-7249c43438ce']),
//     ('user4', 'User Four', 'abc123', 28, 'Just a user in a digital world.', 'Male', '111-222-3333', ARRAY['f53c095c-78fb-4759-8c74-18be4a4853f1']),
//     ('user5', 'User Five', 'p@ssw0rd', 19, 'Living life to the fullest.', 'Female', '444-555-6666', ARRAY['9eaf6203-9b18-4a41-8eeb-50a5d82d04f0']);
