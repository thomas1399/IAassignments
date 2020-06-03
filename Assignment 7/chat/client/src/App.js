

import React, { useState, useEffect } from "react";
import bootstrap from "react-bootstrap"
import io from "socket.io-client";
import InputComponent from "./InputComponent"
const socket = io("http://localhost:3000");
export default function App() {
    const [messages, setMessages] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userList, setUserList] = useState([])
    useEffect(() => {
        socket.on('message', data => {
            setMessages(m => [...m, data]);
        });

        socket.on("loggedIn", data => {
            setIsLoggedIn(true);
            setMessages(m => [...m, data]);
        })

        socket.on("userList", data => {
            setUserList(data)
            
        })

        socket.on("newLogIn", data => {
          setMessages(m => [...m, data])
        })

        
    }, []);

    const send = (message) => {
        var newMsg = {
          msg: message,
          socketId: socket.id
        }
        socket.emit('message', newMsg);
    }

    const login = (username) => {
        var newEntry = {
          user: username,
          socketId: socket.id
        }
        socket.emit('login', newEntry)
    }

    return (
          isLoggedIn === true ?
          <div className="container " >
            <ul >
                {messages.map(m => <li style={{textDecoration: "none", listStyleType: "none"}} class="border border-primary rounded">{m}</li>)}
                
            </ul>
            <InputComponent send={send} buttonText='Send' />
            <ol>
                {userList.map(u => <li>{u.user}</li>)}
            </ol>
          </div>
          :
          <div className="container">
              <InputComponent send={login} buttonText='Login'/>
          </div>
        
    );
}