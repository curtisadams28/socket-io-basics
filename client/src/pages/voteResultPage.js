import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { SocketContext } from "../App"
import { useNavigate } from "react-router-dom";



function VoteResultPage() {

  const [initiator, setInitiator] = useState(null);
  const [initiatorPercentage, setInitiatorPercentage] = useState(null);
  const [target, setTarget] = useState(null);
  const [targetPercentage, setTargetPercentage] = useState(null);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('update_percentages', (data) => {
      console.log(data);
      setInitiator(data.initiator);
      setInitiatorPercentage(data.initiatorPercentage);
      setTarget(data.target);
      setTargetPercentage(data.targetPercentage);


    });
  }, [socket]);

  return(
    <div className="vote-result">
      <div className="title voting-modal-title">
        <h1>Results</h1>
      </div>
      <div className="result-bar-container">
          <div className="result-bar-labels">
            <p className="result-bar-initiator">{initiator}</p>
            <p className="result-bar-target">{target}</p>
          </div>
          <div className="result-bar">
            <div className="initiator-bar" style={{width: initiatorPercentage + '%'}}>
              <p className="initiator-percentage">{initiatorPercentage}</p>
            </div>
            <div className="target-bar" style={{width: targetPercentage + '%'}}>
              <p className="target-percentage">{targetPercentage}</p>
            </div>
          </div>
        </div>
    </div>
  );
}

export default VoteResultPage;