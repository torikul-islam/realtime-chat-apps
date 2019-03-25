const cors = require('cors');
const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http,  { origins: '*:*'});
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/chat-app", {useNewUrlParser: true})
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB..."));

io.on("connection", (socket)=>{
    console.log("a user is connected");

    socket.on("message", function (data) {
        
    });

    socket.on("disconnect", (socket)=>{
        console.log('user disconnected')
    });
});


const messageSchema = new mongoose.Schema({
    name: String,
    message: String
});

const Message = mongoose.model("message", messageSchema);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/", async (req, res) => {
    const data = await Message.find();
    res.send(data);
});

app.post("/", async (req, res) => {
    const messageObj = new Message({
        name: req.body.name,
        message: req.body.message
    });

    await messageObj.save();
    res.sendStatus(200);

});


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
