import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { SocketContext } from "../App"
import RangeSlider from '../components/rangeSlider';
import { useNavigate } from "react-router-dom";

function VotingPage(props) {

  const navigate = useNavigate();

  const socket = useContext(SocketContext);

  const [timeCount, setTimerCount] = useState(props.voteModalTime);
  const [vote, setVote] = useState(null);
  const [damage, setDamage] = useState(null);

  // Creates the countdown timer.
  function createCountdown(time) {
    // Create an interval that updates the countdown every second
    const interval = setInterval(() => {
      // Decrement the time remaining
      time -= 1000;
      setTimerCount(time);
      // If the time remaining is less than or equal to 0, stop the interval
      if (time <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  // Call createCountdown when the component is first rendered
  useEffect(() => {
    createCountdown(timeCount);
  }, []);

  // Use the current value of vote when timeCount reaches 0
  useEffect(() => {
    if (timeCount <= 0) {
      // Send the data before the component stops rendering.
      sendData();
      props.setVoteModal(false);
    }
  }, [timeCount]);

  function sendData() {
    if (!vote || !damage) {
      console.log('ERROR: Did not answer in time');
      return;
    } else {
      socket.emit('send_vote', {vote, damage});
    }
    
  }

  useEffect(() => {
    if (props.showVoteResult === true) {
      navigate("../Result");
    }
    
  }, [props.showVoteResult]);

  return (
    <div className="page voting-modal">
      <div className="title voting-modal-title">
        <h1>Vote</h1>
        <span>{(timeCount / 1000).toString()}</span>
      </div>
      <div className="content">
        <h2>Who Would Win?</h2>
        <label class="btn big-radio-button">
          <p>{props.initiator}</p>
          <input type="radio" name="vote" />
        </label>
        <p className="vs">VS</p>
        <label class="btn big-radio-button">
          <p>{props.target}</p>
          <input type="radio" name="vote" />
        </label>
      </div>

    </div>
  );
}

export default VotingPage;