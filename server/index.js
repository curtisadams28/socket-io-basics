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

  let eventEmitted = false;
  socket.on("send_vote", (data) => {
    console.log(data);
    allVotes.push(data);
    console.log(`All Votes: ${allVotes.values}`)

    // Check if the "receive_vote" event has already been emitted.
    if (!eventEmitted) {
      // Use setTimeout to add a delay before emitting the "receive_vote" event.
      setTimeout(() => {
        socket.emit("receive_vote", allVotes);
        eventEmitted = true; // Set the flag variable to true to prevent the event from being emitted again.
      }, 1000); // The delay time is 1000 milliseconds, or 1 second.
    }

  });

  socket.on("send_modal_info", (data) => {
    //console.log(data);
    eventEmitted = false;
    io.sockets.emit("receive_modal_info", data);
  });

});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

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