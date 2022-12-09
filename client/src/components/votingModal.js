import { useState } from "react";

function VotingModal(props) {
  const [timeCount, setTimerCount] = useState(props.checkTime);

  function timer() {
    console.log(props.checkTime);
    setInterval(() => {
      setTimerCount(timeCount - 1000);
    }, 1000);
  }

  if (props.check === true) {
    timer();
    if (timeCount === 0) {
      props.setCheck(false);
    }

    return (
      <div className="voting-modal">
        <span>{timeCount}</span>
        <h1>Voting</h1>
      </div>
    );
  }
}

export default VotingModal;