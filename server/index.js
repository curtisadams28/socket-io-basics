const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

let votes = [];

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);


  socket.on("send_percentage", (data) => {
    console.log(data);
    storeVotes(data);
    console.log(votes);
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});


function storeVotes(vote) {
  votes.push(vote);
}


/*

// TODO
- We need two types of users, players and gm.
- Tie a socket id to a player/gm. Users will be able to select from a menu.
- Validation to stop a player from putting in multiple votes (can be done on font-end for now)
- The vote needs to be called by the GM.
    - Timer
- Caluclation of the vote average.
- Display for the outcome.

*/