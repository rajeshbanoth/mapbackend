var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

const socket = require('socket.io');

const app = express()


app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("server running")
})


const server = app.listen(9000,()=>{
    console.log("server running on 9000")
})

const io = socket(server, {
    cors: {
      origin: ['https://rajmaps.netlify.app',"http://localhost:3000","https://rajmaps.netlify.app/driver"],
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

    console.log("user conneted")
  
    socket.on("send_driver_location", (data) => {
        socket.broadcast.emit("recieve_driver_location", data);             
    });


    socket.on("send_driver_route", (data) => {
        socket.broadcast.emit("recieve_driver_route", data);             
    });




  });
