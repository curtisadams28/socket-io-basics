import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { SocketContext } from "../App"

function VoteResult() {

  const [skillPercentage, setSkillPercentage] = useState(null);
  const [damage, setDamage] = useState(null);
  const [skillPassOrFail, setSkillPassOrFail] = useState(null);
  const [diceRoll, setDiceRoll] = useState(null);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('receive_vote', (data) => {
      //console.log(data);
      getAverages(data);
    });
  }, [socket]);

  function getAverages(votesArray) {
    let totalSkillPercentage = 0;
    let totalDamage = 0;
    let dice = Math.random();

    //console.log(`Votes Array: ${votesArray}`);

    for (let i = 0; i < votesArray.length; i++) {
      //console.log(`User ${i + 1}       Damage: ${votesArray[i].damage}`);

      totalSkillPercentage += votesArray[i].vote;
      totalDamage += votesArray[i].damage;
    }

    //console.log(votesArray.length);

    setSkillPercentage(totalSkillPercentage / votesArray.length);
    setDamage(totalDamage);


    


    //console.log(`Total Damage: ${totalDamage}`);
    //console.log(`Total Votes: ${skillPercentage}`);
  }

  function roundToNearest(num) {
    if (num >= 0.5) {
      return Math.round(num);
    } else {
      return Math.floor(num);
    }
  }
  

  // The vote result should return the following:
  // 1. Each vote in a list
  // 2. Each damage in a list
  // 3. Average Vote
  // 4. Average Damage
  // 5. The Roll
  // 6. Success or Fail for votes


  return(
    <div className="vote-result">
      <h1></h1>
      <span>{skillPercentage}</span>
      <span>{damage}</span>
    </div>
  );
}

export default VoteResult;