import io from "socket.io-client";
import React from 'react';
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";

// Files
import "./App.css";

// Pages
import SelectUserPage from './pages/selectUserPage';
import CreateVotePage from './pages/createVotePage';
import PlayerPage from './pages/playerPage';
import VotingPage from './pages/votingPage';
import VoteResultPage from './pages/voteResultPage';
import RedirectToHomeOnRefresh from './components/redirectToHomeOnRefresh';

// Create a React context for the socket
const SocketContext = React.createContext(null);
const socket = io.connect("http://localhost:3001");

function App() {

  const [playerType, setPlayerType] = useState(null);
  const [voteModal, setVoteModal] = useState(false);
  const [voteModalTime, setVoteModalTime] = useState(4000);
  const [initiator, setInitiator] = useState(null);
  const [target, setTarget] = useState(null);
  const [damage, setDamage] = useState(null);
  const [showVoteResult, setShowVoteResult] = useState(false);
  const [voteResult, setVoteResult] = useState(null);



  


  // Move these to the relevant components. Just switch pages instead of the props business.
  useEffect(() => {
    socket.on('receive_modal_info', (data) => {
      //console.log(data);
      setVoteModal(data.setVoteModal);
      setVoteModalTime(data.setVoteModalTime);
      setInitiator(data.initiator);
      setTarget(data.target);
      setDamage(data.damage);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('receive_vote', (data) => {
      setShowVoteResult(true);
      setVoteResult(data);
    });
  }, [socket]);






  return (
    <div className="wrapper">

      <BrowserRouter>
        <SocketContext.Provider value={socket}>
        <RedirectToHomeOnRefresh />
        {(voteModal) ? <VotingPage voteModalTime = {voteModalTime} setVoteModal = {setVoteModal} showVoteResult = {showVoteResult} initiator={initiator} target={target}/> : null}
          <Routes>
              <Route path="/" element={<SelectUserPage playerType = {playerType} setPlayerType = {setPlayerType}/>}/>
              <Route path="create-vote" element={<CreateVotePage playerType = {playerType} setVoteModalTime = {setVoteModalTime} voteModalTime = {voteModalTime}/>} />
              <Route path="player" element={<PlayerPage/>} />
              <Route path="Result" element={<VoteResultPage voteResult = {voteResult} setShowVoteResult = {setShowVoteResult} playerType={playerType}/>} />
            </Routes>
        </SocketContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
export {SocketContext};

