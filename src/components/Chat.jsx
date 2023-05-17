import React, {useEffect, useState} from 'react';
import '../styles/Chat.css'
import {FaUser} from "react-icons/fa";
import axios from "axios";


const Chat = ({user, users, getUsers}) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);

    const idInstance = localStorage.getItem('idInstance');
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');

    useEffect(() => {
        getMessage();
    }, []);

    const sendMessage = async () => {
        await axios.post(`https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
            {
                chatId: user,
                message: value
            });
        const message = {
            text: value,
            id: Math.random(),
            sender: 'me'
        }
        setMessages(prevState => [...prevState, message]);
    }

    async function getMessage() {
        try {
            const {data} = await axios.get(`https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);
            if (data === null) {
                throw new Error('data is null');
            }

            const sender = data.body.senderData.chatId;
            if (!users.includes(sender)) {
                getUsers([...users, sender]);
            }

            const message = {
                text: data.body.messageData.textMessageData.textMessage,
                id: data.receiptId,
                sender: sender
            }

            setMessages(prevState => [...prevState, message]);

            await axios.delete(`https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${data.receiptId}`);
            await getMessage();
        } catch (e) {
            await getMessage();
        }
    }

    function messagesFilter(obj) {
        return (obj.sender === user || obj.sender === 'me');
    }

    return (
        <div className='chat'>
            <header>
                <div className='chat-user'>
                    <FaUser className='chat-icon' size={30} color={'#ffffff'}/>
                    <div className='chat-user__text'>
                        <p>{user}</p>
                    </div>
                </div>
            </header>
            <div className='chat-messages'>
                {messages && messages.filter(messagesFilter).map(message => (
                    message.sender === 'me' ?
                    <p key={message.id} className='chat-message' style={{'background': '#128C7E'}}>{message.text}</p>
                        :
                    <p key={message.id} className='chat-message' style={{'background': '#444444'}}>{message.text}</p>
                ))}
            </div>
            <footer className='chat-footer'>
                <input className='chat-input' placeholder='Введите сообщение' value={value}
                       onChange={(e) => setValue(e.target.value)}/>
                <button className='chat-button' onClick={sendMessage}>Отправить</button>
            </footer>
        </div>
    );
};

export default Chat;