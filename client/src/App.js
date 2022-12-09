import "./App.css";
import PlayerSelect from './components/PlayerSelect';
import GmPage from './components/gmPage';
import VotingModal from './components/votingModal';
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://192.168.1.109:3001");



function App() {

  const [playerType, setPlayerType] = useState(null);
  const [check, setCheck] = useState(false);
  const [checkTime, setCheckTime] = useState(20000);

  //console.log(checkTime);

  return (
    <div className="wrapper">
      <PlayerSelect playerType = {playerType} setPlayerType = {setPlayerType}/>
      <GmPage playerType = {playerType} setCheck = {setCheck} setCheckTime = {setCheckTime}/>
      <VotingModal check = {check} checkTime = {checkTime} setCheck = {setCheck}/>
    </div>
  );
}

export default App;

