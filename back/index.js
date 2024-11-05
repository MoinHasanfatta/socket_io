const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const server = http.createServer(app);
// console.log(server);

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message",(data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data)
  });
});

server.listen(3003, () => {
  console.log("Server is ready!!");
});
