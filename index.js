const express = require("express")
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
main()
.then(()=>{
    console.log("Connection successfull");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

app.set("views" , path.join(__dirname,"views"));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/" , (req,res)=>{
    res.send("working root");
})

app.listen(8080, ()=>{
    console.log('Server is listening...');
})

//Index Route
app.get("/chats" , async (req,res) =>{
    let chats = await Chat.find();// sb data aa jayega and db se ayega to wait krna dega hence async await
    // console.log(chats);
    res.render("index.ejs",{chats});
})

//New route
app.get("/chats/new" , (req,res)=>{
    res.render("new.ejs");
})

//Create route - post req
app.post("/chats",(req,res)=>{
    let {from,to,msg} = req.body;
    let newChat = new Chat({
        from: from,
        to:to,
        msg:msg,
        created_at: new Date(),
    });
    // console.log(newChat);
    newChat.save();
    res.redirect("/chats");
});

//Edit route 
app.get("/chats/:id/edit" , async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs" , {chat});
});

//Update route
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg:newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true, new:true});
    console.log(updatedChat);
    res.redirect("/chats");
})

//Delete route
app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
     res.redirect("/chats");
})
