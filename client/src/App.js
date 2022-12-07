
import './App.css';
import io from 'socket.io-client';
import {useEffect} from 'react';
const socket = io.connect('http://localhost:3001');

function App() {

  const sendMessage = () => {
    // Emit sends messages to the server? Double check that.
    socket.emit('send_message', {message: 'hello'});
  }

  // Hook called whenever we recive a message. 
  useEffect(() => {
    socket.on('recieve_message', (data) => {
      alert(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input placeholder='Message'></input>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
