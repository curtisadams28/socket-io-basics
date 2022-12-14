import "./App.css";

// Pages
import PlayerSelect from './components/PlayerSelect';
import GmPage from './components/gmPage';
import PlayerPage from './components/playerPage';
import VotingModal from './components/votingModal';
import VoteResult from './components/voteResult';

import io from "socket.io-client";
import React from 'react';
import { useEffect, useState } from "react";


// Create a React context for the socket
const SocketContext = React.createContext(null);

const socket = io.connect("http://192.168.1.120:3001");

function App() {

  const [playerType, setPlayerType] = useState(null);
  const [voteModal, setVoteModal] = useState(false);
  const [voteModalTime, setVoteModalTime] = useState(4000);

  useEffect(() => {
    socket.on('receive_modal_info', (data) => {
      //console.log(data);
      setVoteModal(data.setVoteModal);
      setVoteModalTime(data.setVoteModalTime);
    });
  }, [socket]);

  return (
    <div className="wrapper">
      <SocketContext.Provider value={socket}>
        <PlayerSelect playerType = {playerType} setPlayerType = {setPlayerType}/>
        {(playerType === 'gm') ? <GmPage playerType = {playerType} voteModal = {voteModal} setVoteModalTime = {setVoteModalTime} voteModalTime = {voteModalTime}/>: null}
        {(playerType === 'player') ? <PlayerPage />: null}
        {voteModal ? <VotingModal voteModalTime = {voteModalTime} setVoteModal = {setVoteModal}/> : null }
        <VoteResult />
      </SocketContext.Provider>
    </div>
  );
}

export default App;
export {SocketContext};

