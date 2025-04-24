import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from './interceptors/fetch';

const Chat = () => {
  const { id } = useParams(); 
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('access_token') === null){                   
      navigate('/login');
    }else{
    customFetch(`/api/messages/${id}`) 
      .then(res => res.json())
      .then(data => setMessages(data));
    }
  }, [id]);

  return (
    <div className="chat-page">
      <h2>Chat</h2>
      <div className="messages-box">
        {messages.map((msg) => (
          <p key={msg._id}><strong>{msg.senderName}:</strong> {msg.text}</p>
        ))}
      </div>

    </div>
  );
};

export default Chat;
