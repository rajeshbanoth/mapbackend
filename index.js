var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

const socket = require('socket.io');

const app = express()


app.use(cors())
app.use(express.json())


const server = app.listen(process.env.PORT||9000,()=>{
    console.log("server running on "+process.env.PORT)
})

const io = socket(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
    maxHttpBufferSize: 1e8 // 100 MB
  });

  
 global.onlineUsers = new Map();


 io.on("connection", (socket) => {
    // global.chatSocket = socket;
    // socket.on("add-user", (userId) => {
    //   onlineUsers.set(userId, socket.id);
    // });
  
    socket.on("send_driver_location", (data) => {
        socket.broadcast.emit("recieve_driver_location", data);             
    });





  });
