const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
let allVotes = [];
const voteTimeout = 3000;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_vote", (data) => {
    allVotes.push(data);

    console.log(`All Votes: ${allVotes.values}`)
  });

  // R
  socket.on("start_vote", (data) => {
    allVotes = [];
    io.sockets.emit("receive_modal_info", data);

    let time = data.setVoteModalTime + voteTimeout;
    const interval = setInterval(() => {
      time -= 1000;
      if (time <= 1000) {
        clearInterval(interval);
        socket.emit("receive_vote", allVotes);
      }
    }, 1000);
  });

});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

function createCountdown(timeMax, voteTimeout) {

}

/*

// TODO
- Handle no votes sent from clients.

*/