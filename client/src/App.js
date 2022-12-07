import "./App.css";
import PlayerSelect from './components/PlayerSelect';
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://192.168.1.109:3001");



function App() {

  const [playerType, setPlayerType] = useState(null);
  console.log(playerType);

  return (
    <div className="wrapper">
      <PlayerSelect playerType = {playerType} setPlayerType = {setPlayerType}/>
    </div>
  );
}

export default App;

