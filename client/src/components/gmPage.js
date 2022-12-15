import { useEffect, useState } from "react";
import React, { useContext } from "react";
import { SocketContext } from "../App"

function GmPage(props) {

  const socket = useContext(SocketContext);

  const [timeLimit, setTimeLimit] = useState(7000);

  function updateSlider(e) {
    setTimeLimit(e.target.value);
  }

  function handleClick() {
    //props.setCheck(true);
    //props.setCheckTime(timeLimit * 1000);
    sendData();
  }

  function sendData() {
    socket.emit('start_vote', {setVoteModal: true, setVoteModalTime: timeLimit * 1000});
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
        <button className="btn" onClick={handleClick}>Create Vote</button>
      </div>
    </div>
  );
}

export default GmPage;