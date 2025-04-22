import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Chat = () => {
  const { id } = useParams(); 
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`/api/messages?chatId=${id}`) 
      .then(res => res.json())
      .then(data => setMessages(data));
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
