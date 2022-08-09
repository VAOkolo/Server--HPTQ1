const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 4000;
// const PORT = 8000;

const server = http.createServer(app);

//db
const mongoose = require("mongoose");
const { seedDB } = require("./seeds");

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("HPTQ API");
});

// mongoose
//   .connect(process.env.MONG_URI)
//   // .then(() => {
//   //     seedDB()
//   // })
//   .then(() => {
//     server.listen(PORT, () => {
//       console.log("Connected to db & listening at port " + PORT);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user conneted", socket.id);

  socket.on("send_message", (data, room) => {
    console.log(room);
    socket.to(room).emit("recieved_message", data, socket.id);
    console.log(data);
  });

  socket.on("set_all_other_turns_false", (room) => {
    socket.broadcast.to(room).emit("make_all_other_turns_false");
  });

  socket.on("send_canvas", (data, room) => {
    socket.to(room).emit("recieved_canvas", data);
    socket.to(room).emit("recieved_id", socket.id);
  });

  socket.on("refresh_canvas", (data, room) => {
    socket.to(room).emit("refreshed_canvas", data);
  });

  socket.on("join_room", (userName, availablePlayers, room) => {
    socket.join(room);
    socket.to(room).emit("players_in_room", availablePlayers);
    console.log(`Users in this current room are ${availablePlayers}`);
    console.log(`User: ${userName} joined room ${room}`);
  });
});

server.listen(PORT, () => {
  console.log("Connected to db & listening at port " + PORT);
});
