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
      //console.log(data);
      //getAverages(data);
      //setSkillPercentage(data.vote);
      //setDamage(data.damage);
    });
  }, [socket]);

  function getAverages(votesArray) {
    let totalSkillPercentage;
    let totalDamage;

    console.log(votesArray);

    for (let i = 0; i < votesArray.length; i++) {
      totalSkillPercentage =+ votesArray[i].vote;
      totalDamage =+ votesArray[i].damage;
      console.log(`Damage: ${votesArray[i].damage}`);
    }
    console.log(`Totals: ${totalSkillPercentage, totalDamage}`);
  }

 return(
  <div className="vote-result">
    <span>{skillPercentage}</span>
  </div>
 );
}

export default VoteResult;