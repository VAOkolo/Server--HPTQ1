const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require('dotenv').config()

const PORT = process.env.PORT || 8000
// const PORT = 8000;

const server = http.createServer(app);

//db
const mongoose = require('mongoose')
const { seedDB } = require('./seeds')

app.use(cors());
app.use(express.json())

const userRoutes = require('./routes/userRoutes')

app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.send("HPTQ API")
})

// app.listen(process.env.PORT, () => {
//     console.log("Connected to db & listening at port " + process.env.PORT)
// })
mongoose.connect(process.env.MONG_URI)
    // .then(() => {
    //     seedDB()
    // })
    .then(() => {
        server.listen(PORT, () => {
            console.log("Connected to db & listening at port " + PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user conneted", socket.id);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("recieved_message", data, socket.id);
    console.log(data);
  });


  socket.on("send_canvas", (data, room) => {
    console.log("socket io room :", room);
    console.log("canvas ..data..sending data");

    socket.to(room).emit("recieved_canvas", data);
    socket.to(room).emit("recieved_id", socket.id);
  });

  socket.on("refresh_canvas", (data, room) => {
    socket.to(room).emit("refreshed_canvas", data);
  });

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("join room", data, "userid", socket.id);
  });
});
