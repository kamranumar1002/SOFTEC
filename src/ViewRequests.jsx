import React, { useState, useEffect } from "react";
import customFetch from "./interceptors/fetch";
import { useNavigate } from "react-router-dom";

const ViewRequests = () => {
  const [tab, setTab] = useState("pending"); // Default tab
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('access_token') === null){                   
      navigate('/login');
    }else{
    customFetch(`https://your-api.com/api/requests/${localStorage.getItem("user_id")}/${tab}`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error("Error fetching requests:", err));
    }
  }, [tab]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Booking Requests</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["upcoming", "past", "pending"].map((type) => (
          <button
            key={type}
            onClick={() => setTab(type)}
            style={{ padding: "6px 12px", background: tab === type ? "#333" : "#eee", color: tab === type ? "#fff" : "#000", border: "none", borderRadius: "4px" }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {requests.length === 0 ? (
        <p>No {tab} requests.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {requests.map((req) => (
            <li
              key={req._id}
              style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "6px" }}
            >
              <p><strong>Event:</strong> {req.eventType}</p>
              <p><strong>Date:</strong> {req.eventDate}</p>
              <p><strong>Time:</strong> {req.startTime} - {req.endTime}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Requested At:</strong> {new Date(req.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewRequests;
