import { useState, useEffect } from "react";

function VotingModal(props) {

  const [timeCount, setTimerCount] = useState(props.checkTime);

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
        props.setCheck(false);
      }
    }, 1000);
  }

  // Call createCountdown when the component is first rendered
  useEffect(() => {
    createCountdown(timeCount);
  }, []);

  return (
    <div className="voting-modal">
      <h1>Decide the Outcome</h1>
      <h2>Countdown</h2>
      <span>{(timeCount / 1000).toString() + 's'}</span>
      <h2>Likelyhood of Success</h2>
      <button class="btn chanceBtn" onClick="handleClick()">0%</button>
      <button class="btn chanceBtn" onClick="handleClick()">25%</button>
      <button class="btn chanceBtn" onClick="handleClick()">50%</button>
      <button class="btn chanceBtn" onClick="handleClick()">75%</button>
      <button class="btn chanceBtn" onClick="handleClick()">100%</button>

    </div>
  );
}

export default VotingModal;