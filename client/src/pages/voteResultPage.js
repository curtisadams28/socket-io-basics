import { useState, useEffect } from "react";
import React, { useContext } from "react";
import { SocketContext } from "../App"
import { useNavigate } from "react-router-dom";

function VoteResultPage({voteResult, setShowVoteResult, playerType}) {
  const [fateResult, setFateResult] = useState(null);
  const [fateVoteList, setFateVoteList] = useState(null);
  const [fateAvgVote, setFateAvgVote] = useState(null);
  const [resolveResult, setResolveResult] = useState(null);
  const [resolveVoteList, setResolveVoteList] = useState(null);

  const navigate = useNavigate();

  const socket = useContext(SocketContext);

  useEffect(() => {

    // Stops errors on page refresh.
    if (voteResult === null) {
      navigate('/');
      
    } else {
      getAverages(voteResult);
    }
    console.log(voteResult);
    
  }, [voteResult]);

  function getAverages(votesArray) {
    let totalSkillPercentage = 0;
    let totalDamage = 0;
    let dice = Math.floor(Math.random() * 11);

    for (let i = 0; i < votesArray.length; i++) {
      totalSkillPercentage += votesArray[i].vote;
      totalDamage += votesArray[i].damage;
    }

    setFateResult(dice);
    setFateAvgVote(Math.round(totalSkillPercentage / votesArray.length));
    setFateVoteList(joinVoteArray(votesArray, 'vote'));

    setResolveResult(Math.round(totalDamage / votesArray.length));
    setResolveVoteList(joinVoteArray(votesArray, 'damage'));

    function joinVoteArray(arr, type) {
      const voteValues = arr.map(obj => obj[type]);
      return(`Votes: ${voteValues.join(', ')}`);
    }
  }

  function closeResults() {
    setShowVoteResult(false);
    console.log(playerType);
    navigate(playerType);
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
      <div className="title">
        <h1>Results</h1>
      </div>
      <div className="content">
        <div className="fate-result-cotnainer">
          <h1>Fate</h1>
          <div className="result-info">
            <div className="result-box">
              <p className="result">{fateResult}</p>
            </div>
            <div className="info-box">
              <p className="avg-vote">{fateAvgVote ? (`DC: ${fateAvgVote}`) : null}</p>
              <p className="votes">{fateVoteList}</p>
            </div>
          </div>

        </div>
        <div className="resolve-result-cotnainer">
          <h1>Resolve Damage</h1>
          <div className="result-info">
            <div className="result-box">
              <p className="result">{resolveResult}</p>
            </div>
            <div className="info-box">
              <p className="votes">{resolveVoteList}</p>
            </div>
          </div>
        </div>
        <button className="btn" onClick={closeResults}>Close</button>
      </div>
    </div>
  );
}

export default VoteResultPage;