let express = require("express");
let http = require("http");
let socketIo = require("socket.io");
let app = express();
let user = [];

app.get("/", (req, res) => {
  res.send("hello world");
});

let server = http.Server(app);

server.listen(4000, () => console.log("Listening on port 4000"));

const io = socketIo(server);

io.on("connection", socket => {
  user.push(user + 1);
  console.log(`${user.length} user connected`);

  socket.on("sentMessage", data => {
    io.emit("message", data);
  });

  //handling disconnects
  socket.on("disconnect", function() {
    user.pop(user - 1);
    console.log(`${user.length} user connected`);
  });
});
