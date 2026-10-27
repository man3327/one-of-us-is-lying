const express = require('express');
const app = express()
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const users = [];
app.get('/', (req, res) => {
  res.render('login');
});
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (roomName) => {
    socket.join(roomName); 
    console.log(`User ${socket.id} joined room: ${roomName}`);
        socket.emit("message", `You have joined the room: ${roomName}`);
  });
});
app.post('/login',(req,res)=>{
  const { name } = req.body;
  users.push({ name });
  console.log(name);
  res.redirect('/users');
})
app.get('/users',(req,res)=>{
  res.render('index',{users});
})
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
