
import './App.css';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');

function App() {

  const sendMessage = () => {
    socket.emit('send_message', {message: 'test message object'});
  }
  return (
    <div className="App">
      <input placeholder='Message'></input>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
