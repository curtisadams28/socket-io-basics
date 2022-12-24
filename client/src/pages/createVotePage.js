import { useEffect, useState } from "react";
import React, { useContext } from "react";
import { SocketContext } from "../App"
import { useNavigate } from "react-router-dom";
import ButtonBar from "../components/buttonBar";


function CreateVotePage(props) {

  const socket = useContext(SocketContext);

  const [timeLimit, setTimeLimit] = useState(7000);
  const [initiator, setInitiator] = useState(null);
  const [target, setTarget] = useState(null);
  const [damage, setDamage] = useState(false);

  const navigate = useNavigate();

  function updateSlider(e) {
    setTimeLimit(e.target.value);
  }

  function createVote() {
    socket.emit('start_vote', {setVoteModal: true, setVoteModalTime: timeLimit * 1000, initiator: initiator, target: target, damage: damage});
  }

  function handleInitiator(e) {
    setInitiator(e.target.value);
  }

  function handleTarget(e) {
    setTarget(e.target.value);
  }

  function handleDamageButton(e) {
    setDamage(e.target.value)
  }

  return (
    <div className="gm-page">
      <div className="title">
        <h1>GM Page</h1>
      </div>
      <div className="content">
        <div className="time-range range-selector">
          <div className="time-limit">
            <h2>Time Limit</h2>
            <p>{timeLimit}s</p>
          </div>
          <input onChange={updateSlider} type="range" min="1" max="50" value={timeLimit} className="range-slider" id="myRange"></input>
        </div>
        <div className="vote-options">
          <h2>Vote Options</h2>
          <input className='text-input' type='text' onInput={handleInitiator} placeholder='Initiator'></input>
          <input className='text-input' type='text' onInput={handleTarget} placeholder='Target'></input>
        </div>
        <div>
          <h2>Damage</h2>
          <ButtonBar options={['No', 'Yes']} values={[false, true]} dataType='string' updateState={handleDamageButton}/>
        </div>
        <button className="btn" onClick={createVote}>Create Vote</button>
      </div>
    </div>
  );
}

export default CreateVotePage;