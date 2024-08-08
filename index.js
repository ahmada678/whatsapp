const express = require("express");
const app = express();
const http = require("http");
const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);
app.use(express.static("../page"));

// app.get("/hello",(req,res)=>{res.send("in")});

io.on("connection", (socket) => {
  console.log("online");

  socket.on("join", (room) => {
    console.log("join:room name : " + room);
    socket.join(room);
  });

  socket.on("leave", () => {
    socket.leave();
    console.log("leaveing");
  });
  socket.on("msg",(data)=>{
  const {room ,msg}=data;
  console.log(room);
  console.log(msg);
  io.to(room).emit("room_msg",msg);
  });

  socket.on("disconnect", () => {
    console.log("offline");
  });
});

server.listen(8080, () => {
  console.log("server runing in : http://localhost:8080");
});
