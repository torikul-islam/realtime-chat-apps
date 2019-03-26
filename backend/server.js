let express = require("express");
let cors = require("cors");
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
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true
  }
});

const Message = mongoose.model("message", messageSchema);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", socket => {
  user.push(user + 1);
  console.log(`${user.length} connected`);

  socket.on("initialData", async () => {
    const messages = await Message.find()
      .select("name message");
    io.emit("initialAllMessage", messages);
  });

  socket.on("sentMessage", async data => {
    const message = new Message({
      name: data.name,
      message: data.message,
      created: new Date()
    });
    const result = await message.save();

    io.emit("chatMessage", result);
  });

  //handling disconnects
  socket.on("disconnect", function() {
    user.pop(user - 1);
    console.log(`${user.length} user connected`);
  });
});
