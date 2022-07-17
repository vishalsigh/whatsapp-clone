import React, { useState, useEffect } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/messages/sync').then((response) => {
      setMessages(response.data);
      
    });
  }, []);

  useEffect(() =>{
    const pusher = new Pusher('8c939fc234679e499f17', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return() => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages]);

  return (
    <div className="app">
      <div className="app_body">
      <Sidebar />
      <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
