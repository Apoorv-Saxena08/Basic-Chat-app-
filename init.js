// is file m sara data dalenge!! and sample data 1 bar dal denge
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(()=>{
    console.log("Connection successfull");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

let allChats = [
    {
        from:"king",
        to:"apoorv",
        msg:"Hello meer",
        created_at: new Date(),
    },
        {
        from:"raftaar",
        to:"badshah",
        msg:"Where is client?",
        created_at: new Date(),
    },
        {
        from:"honeySingh",
        to:"badshah",
        msg:"Its yo boyy bruhh!!",
        created_at: new Date(),
    },
        {
        from:"emiway",
        to:"raftaar",
        msg:"Sheikh chilli",
        created_at: new Date(),
    },
        {
        from:"apoorv",
        to:"emiway",
        msg:"Gani bhai",
        created_at: new Date(),
    },
]

Chat.insertMany(allChats);