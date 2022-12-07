import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("192.168.1.109:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");

  /*
  const joinRoom = () => {
    setRoom(1)
    socket.emit("join_room", room);
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  */

  const sendPercentage = (e) => {
    socket.emit('send_percentage', e.target.value)
  }

  return (
    <div className="App">
      <h1>Chance</h1>
      <div className="chance-buttons">
        <button value='0%' onClick={sendPercentage}>0%</button>
      </div>

    </div>
  );
}

export default App;