import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Messages = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`/api/messages?userId=${userId}`);
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchChats();
  }, [userId]);

  return (
    <div className="messages-page">
      <h2>Your Messages</h2>

      {chats.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        chats.map((chat) => (
          <div
            key={chat._id}
            className="message-box"
            onClick={() => navigate(`/chat/${chat._id}`)}
          >
            <h4>{chat.otherUserName}</h4>
            <p>{chat.lastMessage}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
