import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreatorFeed = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/requests?creatorId=123")
      .then(res => res.json())
      .then(data => setRequests(data));
  }, []);

  const filteredRequests = requests.filter(req =>
    filter === "all" ? true : req.status === filter
  );

  return (
    <div className="creator-feed-wrapper">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <Link to="/messages">
          <button className="sidebar-btn">Inbox</button>
        </Link>
        <Link to="/catalogManager">
          <button className="sidebar-btn">Manage Catalog</button>
        </Link>
        <Link to="/creatorReview">
          <button className="sidebar-btn">Your Reviews</button>
        </Link>
      </aside>

      <main className="creator-main">
        <h1 className="page-title">Creator Feed</h1>

        <div className="feed-container">
          <h2>Booking Requests</h2>
          <div className="filter-buttons">
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("pending")}>Pending</button>
            <button onClick={() => setFilter("accepted")}>Accepted</button>
            <button onClick={() => setFilter("rejected")}>Rejected</button>
          </div>

          <div className="request-list">
            {filteredRequests.map(req => (
              <div key={req._id} className="request-card">
                <h4>{req.clientName}</h4>
                <p>{req.eventType} on {req.date}</p>
                <p>Status: <span className={`status ${req.status}`}>{req.status}</span></p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorFeed;
