const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

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

const users = [];
let rooms = [];
let usersInCurrentRoom;
let currentRoom;
let count = 0;
let correctPlayer = "";
let userRemoved = false;

io.on("connection", (socket) => {
  const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
  };

  const getUsersAfterDisconnect = (room, id) => {
    return users.filter((user) => user.room === room && user.id !== id);
  };

  const selectRandomWord = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  socket.on("join_room", (player, room) => {
    users.push(player);
    player.id = socket.id;
    currentRoom = room;
    usersInCurrentRoom = getUsersInRoom(currentRoom);

    io.to(socket.id).emit("initial_room_data", player);

    usersInCurrentRoom.forEach((element, i) => {
      if (i >= 1) {
        element.host = false;
      }
    });

    if (!rooms.find((obj) => obj.roomNumber == room)) {
      rooms.push({
        roomNumber: room,
        players: usersInCurrentRoom,
        gameState: false,
      });
    }

    for (let i = rooms.length - 1; i >= 0; i--) {
      if (rooms[i].gameState == false) {
        if (usersInCurrentRoom.length <= 4) {
          socket.join(room);
          io.to(room).emit("room_data", usersInCurrentRoom);
          socket.emit("accept_connection");
          return;
        } else {
          socket.emit("refuse_connection");
        }
      }

      if (rooms[i].gameState == true) {
        socket.emit("refuse_connection");
      }
    }
  });

  // socket.on("remove_from_room", (id, room) => {
  //   socket.leave(room);
  //   if (userRemoved) {
  //     return;
  //   }
  //   const indexOfUser = usersInCurrentRoom.findIndex((user) => user.id == id);
  //   usersInCurrentRoom.splice(indexOfUser, 1);
  //   userRemoved = true;
  //   io.to(room).emit("room_data", usersInCurrentRoom);
  // });

  // socket.on("delete_room", (room) => {
  //   io.in(room).socketsLeave(room);
  // });

  socket.on("start_game", (room) => {
    rooms = rooms.filter((obj) => obj.roomNumber == room);
    rooms.forEach((room) => (room.gameState = true));
    socket.to(room).emit("redirect_start_game", room);
  });

  socket.on("set_game_rounds", (data, room) => {
    socket.to(room).emit("recieve_game_rounds", data);
    io.to(room).emit("recieve_game_rounds", data);
  });

  socket.on("end_game", (room) => {
    rooms = rooms.filter((obj) => obj.roomNumber == room);
    rooms.forEach((room) => (room.gameState = true));
    io.to(room).emit("redirect_end_game", room);
  });

  socket.on("send_message", (data, room) => {
    socket.to(room).emit("recieved_message", data, socket.id);
  });

  socket.on("set_user_points", (room, data) => {
    let userToGainPoints = usersInCurrentRoom.find((user) => user.id == data);
    userToGainPoints.points += 100;
    io.to(room).emit("room_data", usersInCurrentRoom);
    io.to(room).emit("reset_round");
  });

  socket.on("generate_words_array", (findTheWord, room) => {
    const word = selectRandomWord(findTheWord);
    if (word == undefined || word.length < 0) {
      return;
    }

    io.to(room).emit("received_word_to_guess", word);
  });

  socket.on("send_canvas", (data, room) => {
    socket.to(room).emit("recieved_canvas", data);
    socket.to(room).emit("recieved_id", socket.id);
  });

  socket.on("refresh_canvas", (data, room) => {
    socket.to(room).emit("refreshed_canvas", data);
  });

  socket.on("send_time_up", (room) => {
    currentRoom = room;
    usersInCurrentRoom = getUsersInRoom(currentRoom);
    usersInCurrentRoom.forEach((user, i) => {
      if (i === count) {
        user.active = true;
      } else {
        user.active = false;
      }
    });

    if (count < usersInCurrentRoom.length - 1) {
      count++;
    } else {
      count = 0;
    }
    io.to(room).emit("receive_time_up", usersInCurrentRoom);
    socket.to(room).emit("make_all_other_turns_false");
  });

  socket.on("send_correct_player", (player, room) => {
    correctPlayer = player;
    io.to(room).emit("receive_correct_player", correctPlayer);
  });

  socket.on("disconnect", () => {
    usersAfterDisconnect = getUsersAfterDisconnect(currentRoom, socket.id);
  });
});

server.listen(PORT, () => {
  console.log("Connected! Listening On Port: " + PORT);
});
