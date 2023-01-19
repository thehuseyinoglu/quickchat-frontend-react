import Room from './components/Room';
import Chat from './components/Chat';
import './App.css';
import { useState } from 'react';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000')


function App() {
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [chatScreen, setChatScreen] = useState(false)

  return (
    <div className="App">
      {
        !chatScreen ?
          <Room userName={userName} room={room} setUserName={setUserName} setRoom={setRoom} setChatScreen={setChatScreen} socket={socket} />
          :
          <Chat  socket={socket} userName={userName} room={room} />
      }
    </div>
  );
}

export default App;
