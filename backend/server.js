let express = require("express");
let cors = require('cors');
let http = require("http");
let socketIo = require("socket.io");
let app = express();
const mongoose = require("mongoose");
let user = [];

app.post("/", (req, res) => {});

let server = http.Server(app);

server.listen(4000, () => console.log("Listening on port 4000"));

const io = socketIo(server);


mongoose
  .connect("mongodb://localhost/chat-app", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

const messageSchema = new mongoose.Schema({
  name: String,
  message: String
});

const Message = mongoose.model("message", messageSchema);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));





io.on("connection", socket => {
  user.push(user + 1);
  console.log(`${user.length} user connected`);

  socket.on("initialData",async ()=>{
    let messages = await Message.find();
    io.emit("sentBackendMessage", messages);
  });

  // socket.on("sentMessage", data => {
  //   io.emit("message", data);
  // });

  //handling disconnects
  socket.on("disconnect", function() {
    user.pop(user - 1);
    console.log(`${user.length} user connected`);
  });
});
