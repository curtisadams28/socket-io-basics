const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
let allVotes = [];
const voteTimeout = 3000;

let voteNames = ['initiator', 'target'];
let voteTally = [0, 0];
let damageNames = ['0', '1-3', '4-6', '7-9'];
let damageTally = [0, 0, 0, 0];


let results = {};

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_vote", (data) => {

    let voteWinner = null;

    // Who would win vote
    (data.contestant === 'initiator') ? voteTally[0]++ : null;
    (data.contestant === 'target') ? voteTally[1]++ : null;

    // Damage Vote
    let damage = data.damage;
    console.log(damage);
    switch (damage) {
      case '0':
        damageTally[0]++;
        break;
      case '1-3':
        damageTally[1]++;
        break;
      case '4-6':
        damageTally[2]++;
        break;
      case '7-9':
        damageTally[3]++;
        break;
      default:
        break;
    }

    //let contestantWinner = voteTally.indexOf(Math.max(...voteTally));

    let totalVotes = voteTally[0] + voteTally[1];
    let targetPercentage = Math.round((voteTally[1] / totalVotes) * 100);
    let initiatorPercentage = Math.round((voteTally[0] / totalVotes) * 100);

    let contestantRoll = roll(1, 100);

    let damageWinner = damageTally.indexOf(Math.max(...damageTally));
    let damageRollRange = parseRange(damageNames[damageWinner])
    let damageRoll = roll(damageRollRange.min, damageRollRange.max);
    
    console.log(`Initiator: ${initiatorPercentage}%`);
    console.log(`Target: ${targetPercentage}%`);
    console.log(`damage winner:${damageNames[damageWinner]}`);


 
  

  });

  socket.on("start_vote", (data) => {
    console.log(data);
    voteOptions = data;
    io.sockets.emit("receive_modal_info", data);

    let time = data.setShowVotePageTime + voteTimeout;
    const interval = setInterval(() => {
      time -= 1000;
      if (time <= 1000) {
        clearInterval(interval);
        //socket.emit("receive_vote", allVotes);
        voteOptions = null;
      }
    }, 1000);
  });

});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});


function roll(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Converts '1-3' to { min: 1, max: 3 }
function parseRange(range) {
  let [min, max] = range.split('-').map(Number);
  return { min, max };
}

/*

// TODO
- Handle no votes sent from clients.

*/