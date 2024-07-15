const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


main()
.then((result) => {
    console.log("connection success");
})
.catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/viber');
}


let allChats = ([
    {     
     from : "Ehan",
     to: "Hasmodin",
     message: "I Love you Baba",
     created_at: new Date(),
            
    },

    {     
        from : "Ifra",
        to: "Hasmodin",
        message: "I Love you Baba",
        created_at: new Date(),
               
    },

    {     
        from : "Azil",
        to: "Sabina",
        message: "I Love you Mama",
        created_at: new Date(),
               
    },  
       
    {     
        from : "Aayat",
        to: "Sabina",
        message: "I Love you Mama",
        created_at: new Date(),
               
    }
]);

Chat.insertMany(allChats)
.then((result) => {
    console.log(result);
})
.catch((err) => {
    console.log(err);
});