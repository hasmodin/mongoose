const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const app = express();


const Chat = require("./models/chat.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public/css")));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

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


// const chat1 = new Chat({
//     from : "Sabina",
//     to: "Hasmodin",
//     message: "I Love you",
//     created_at: new Date(),
// });

// chat1.save()
// .then((result) => {
//     console.log(result);
// })
// .catch((err) => {
//     console.log(err);
// })

// chats rout
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", {chats})
});

//root rout
app.get("/", (req, res) => {
    res.send("root is working");
});

//new rout
app.get("/chats/new", (req, res) => {
    res.render("new.ejs")
})

//create rout

app.post("/chats", (req, res) => {
    let {from, to, message} = req.body;
    let newChats = new Chat({
        from:from,
        to:to,
        message: message,
        created_at: new Date,
    });
    newChats.save()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })
    console.log(newChats);
    res.redirect("/chats");
});


//edit rout 

app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});

});

//update rout

app.put("/chats/:id",  async (req, res) => {
    let {id} = req.params;
    let {message: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {message: newMsg}, 
        {runValidators:true, new: true},
    
)   
    console.log(updatedChat);
    res.redirect("/chats");

})

//destroy rout

app.delete("/chats/:id",  async (req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id)
    res.redirect("/chats");
})


app.listen(8080, () => {
    console.log(`server is listening on port 8080`);
})