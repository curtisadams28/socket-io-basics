import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { SocketContext } from "../App"
import RangeSlider from './rangeSlider';
import { useNavigate } from "react-router-dom";

function VotingModal(props) {

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
        <RangeSlider min={0} max={10} className="my-range-slider" updateState={setVote} leftLabel='Easy' rightLabel='Impossible' title="Fate"/>
        <RangeSlider min={0} max={3} className="my-range-slider" updateState={setDamage} leftLabel='0' rightLabel='3' title="Resolve"/>
      </div>

    </div>
  );
}

export default VotingModal;