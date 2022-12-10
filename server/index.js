const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

let allVotes = [];

const io = new Server(server, {
  cors: {
    origin: "http://192.168.1.109:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);


  socket.on("send_vote", (data) => {
    console.log(data);
    allVotes.push(data);
    console.log(`All Votes: ${allVotes.values}`)
    // Need a delay here to allow all votes to come in.
    socket.emit("receive_vote", allVotes);``
  });

  socket.on("send_modal_info", (data) => {
    //console.log(data);
    io.sockets.emit("receive_modal_info", data);
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