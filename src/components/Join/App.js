import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from '../Chat/Chat';
import Animation from './Animation';
import './App.css'
const socket = io.connect('http://localhost:5000');

const App = () => {
  const [username, setUserName] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)


  const joinRoom = () => {
    if (username !== '' && room !== '') {
      const data = { username, room };
      socket.emit('join_room', data); // Enviar el objeto data al servidor
      setShowChat(true);
    }
  };

  return (
  <div className='App'>
  {!showChat ? (
      <div className='containerJoin'>
        <h3>Join A Chat</h3>
        <input type='text' placeholder='Username' value={username} onChange={(e) => {setUserName(e.target.value)}}></input>
        <input  type='text' placeholder='Room ID' value={room} onChange={(e) => {setRoom(e.target.value)}}></input>
        <button onClick={joinRoom}>Ingresa a una Sala</button>
        <Animation/>
      </div>
  ) : (
    <Chat socket={socket} username={username} room={room} />
  )}

  </div>

  )
};

export default App;