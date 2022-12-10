import { useEffect, useState } from "react";
import React, { useContext } from "react";
import { SocketContext } from "../App"

function GmPage(props) {

  const socket = useContext(SocketContext);

  const [timeLimit, setTimeLimit] = useState(7)

  function updateSlider(e) {
    setTimeLimit(e.target.value);
  }

  function handleClick() {
    //props.setCheck(true);
    //props.setCheckTime(timeLimit * 1000);
    sendData();
  }

  function sendData() {
    socket.emit('send_modal_info', {setVoteModal: true, setVoteModalTime: timeLimit * 1000});
  }

  return (
    <div className="gm-page">
      <button onClick={handleClick}>Skill Check</button>
      <input onChange={updateSlider} type="range" min="1" max="50" value={timeLimit} className="slider" id="myRange"></input>
      <p>{timeLimit}s</p>
    </div>
  );
}

export default GmPage;