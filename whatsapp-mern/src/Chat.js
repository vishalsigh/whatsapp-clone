import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import "./Chat.css"

function Chat({messages}) {
    const [input, setInput] = useState('')

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:9000/messages/new', {
            name:"Vishal",
            message:input,
            timestamp:"Just now",
            received: false
        })
        setInput('')
    }
  return (
    <div className="chat">
        <div className="chat__header">
            <Avatar/>

            <div className="chat__headerInfo">
                <h3>Room Name</h3>
                <p>Last seen at...</p>
            </div>
            <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>

            </div>
        </div>
        <div className="chat__body">
            {messages.map((message) => (
            <p className={`chat__message ${message.received && 'chat__receiver'}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>{message.timestamp}</span>
        </p>
        ))}

        </div>

        <div className="chat__footer">
            <InsertEmoticonIcon />
            <form>
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message'
                type="text" />
                <button onClick={sendMessage} type='submit'>Send a message</button>
            </form>
            <MicIcon />
        </div>
    </div>
  )
}

export default Chat