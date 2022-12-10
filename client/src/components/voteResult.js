import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { SocketContext } from "../App"

function VoteResult() {

  const [skillPercentage, setSkillPercentage] = useState(null);
  const [damage, setDamage] = useState(null);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('receive_vote', (data) => {
      console.log(data);
      getAverages(data);
    });
  }, [socket]);

  function getAverages(votesArray) {
    let totalSkillPercentage = 0;
    let totalDamage = 0;

    console.log(votesArray);

    for (let i = 0; i < votesArray.length; i++) {
      //console.log(`User ${i + 1}       Damage: ${votesArray[i].damage}`);

      totalSkillPercentage += votesArray[i].vote;
      totalDamage += votesArray[i].damage;
    }
    console.log(totalDamage);
  }

 return(
  <div className="vote-result">
    <span>{skillPercentage}</span>
    <span>{damage}</span>
  </div>
 );
}

export default VoteResult;