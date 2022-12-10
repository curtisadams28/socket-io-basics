import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { SocketContext } from "../App"

function VotingModal(props) {

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


  function handleClick(e) {
    setVote(e.target.value);
  }
  function handleClickDamage(e) {
    setDamage(e.target.value)
  }

  function sendData() {
    if (!vote || !damage) {
      console.log('ERROR: Did not answer in time');
      return;
    } else {
      socket.emit('send_vote', {vote, damage});
    }
    
  }

  return (
    <div className="voting-modal">
      <h1>Decide the Outcome</h1>
      <h2>Countdown</h2>
      <span>{(timeCount / 1000).toString() + 's'}</span>
      <h2>Likelyhood of Success</h2>
      <button className="btn chanceBtn" value="0" onClick= {handleClick}>0%</button>
      <button className="btn chanceBtn" value="0.25" onClick={handleClick}>25%</button>
      <button className="btn chanceBtn" value="0.5" onClick={handleClick}>50%</button>
      <button className="btn chanceBtn" value="0.75" onClick={handleClick}>75%</button>
      <button className="btn chanceBtn" value="1" onClick={handleClick}>100%</button>
      <h2>Resolve</h2>
      <button className="btn chanceBtn" value="0" onClick= {handleClickDamage}>0</button>
      <button className="btn chanceBtn" value="1" onClick= {handleClickDamage}>1</button>
      <button className="btn chanceBtn" value="2" onClick={handleClickDamage}>2</button>
      <button className="btn chanceBtn" value="3" onClick={handleClickDamage}>3</button>
    </div>
  );
}

export default VotingModal;