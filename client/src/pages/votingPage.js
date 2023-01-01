import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { SocketContext } from "../App"
import { useNavigate } from "react-router-dom";
import ButtonBar from "../components/buttonBar";

function VotingPage({votePageTime, showVoteResult, setShowVotePage, initiator, target}) {

  const navigate = useNavigate();

  const socket = useContext(SocketContext);

  const [timeCount, setTimerCount] = useState(votePageTime);
  const [damage, setDamage] = useState(null);
  const [contestant, setContestant] = useState('none')

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
      sendVote();
      setShowVotePage(false);
    }
  }, [timeCount]);

  function sendVote() {
    if (!contestant || !damage) {
      console.log('ERROR: Did not answer in time');
      return;
    } else {
      socket.emit('send_vote', {contestant, damage});
      navigate("/results");
    }
    setContestant(null);
    setDamage(null);
    setShowVotePage(false);
  }

  function cancelVote() {
    setContestant(null);
    setDamage(null);
  }

  function handleRadioButton(value) {
    if (value === initiator) {
      setContestant('initiator');
    }  
    if (value === target) {
      setContestant('target');
    }  
  }

  function handleDamageButton(e) {
    setDamage(e.target.value);
  }

  function handleSendButton(e) {
    sendVote();
    
  }

  function handleCancelButton(e) {
    cancelVote();
    setShowVotePage(false);
  }


  return (
    <div className="page voting-modal">
      <div className="title voting-modal-title">
        <h1>Vote</h1>
        <span>{(timeCount / 1000).toString()}</span>
      </div>
      <div className={`content radio-buttons ${contestant}`}>
        <h2>Who Would Win?</h2>
        <label onClick={() => handleRadioButton(initiator)} className="btn big-radio-button option1">
          <p>{initiator}</p>
          <input type="radio" name="vote" />
        </label>
        <p className="vs">VS</p>
        <label onClick={() => handleRadioButton(target)} className="btn big-radio-button option2">
          <p>{target}</p>
          <input type="radio" name="vote" />
        </label>
        <h2>Damage to {target}</h2>
        <ButtonBar options={['0', '1-3', '4-6', '7-9']} values={['0', '1-3', '4-6', '7-9']} dataType='string' updateState={handleDamageButton}/>
        <button className="btn" onClick={handleSendButton}>Send</button>
        <button className="btn" onClick={handleCancelButton}>Cancel</button>
      </div>


    </div>
  );
}

export default VotingPage;