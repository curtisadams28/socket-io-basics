import { useEffect, useState } from "react";
import io from "socket.io-client";

function GmPage(props) {
  const [timeLimit, setTimeLimit] = useState(20)

  function updateSlider(e) {
    setTimeLimit(e.target.value);
  }

  function checkButton() {
    props.setCheck(true);
    props.setCheckTime(timeLimit * 1000);
  }


  if (props.playerType === 'gm') {
    return (
      <div className="gm-page">
        <button onClick={checkButton}>Skill Check</button>
        <input onChange={updateSlider} type="range" min="1" max="50" value={timeLimit} className="slider" id="myRange"></input>
        <p>{timeLimit}s</p>
      </div>
    );
  }
}

export default GmPage;