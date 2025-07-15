import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customFetch from "./interceptors/fetch";
import { toast } from "react-hot-toast";
import "./Creatorfeed.css"; // Import the CSS file

const CreatorFeed = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [customInputs, setCustomInputs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (localStorage.getItem("access_token") === null || role !== "creator") {
      navigate("/login");
    } else {
      customFetch(`http://localhost:5000/api/requests`)
        .then((res) => res.json())
        .then((data) => setRequests(data))
        .catch((err) => console.error("Error fetching requests:", err));
    }
  }, [navigate]);

  const handleAccept = async (request) => {
    const quote = {
      requestId: request._id,
      proposed_amount: request.budget,
      message: "Accepted the offer",
    };

    try {
      const response = await customFetch("http://localhost:5000/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: quote
      });

      if (response.ok) {
        toast.success("Quote accepted successfully!");
      } else {
        toast.error("Failed to accept the quote.");
      }
    } catch (error) {
      console.error("Error accepting the quote:", error);
      toast.error("An error occurred.");
    }
  };

  const handleReject = async (request) => {
    toast("You have rejected the request for " + request.event_type);
  };

  const handleInputChange = (requestId, field, value) => {
    setCustomInputs((prev) => ({
      ...prev,
      [requestId]: {
        ...prev[requestId],
        [field]: value,
      },
    }));
  };

  const handleCustomSubmit = async (requestId) => {
    const { message, price } = customInputs[requestId] || {};

    if (!message || !price) {
      toast.error("Please fill in both fields.");
      return;
    }

    const quote = {
      requestId,
      proposed_amount: price,
      message,
    };

    try {
      const response = await customFetch("http://localhost:5000/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: quote,
      });

      if (response.ok) {
        toast.success("Custom quote sent successfully!");
        setCustomInputs((prev) => ({ ...prev, [requestId]: { message: "", price: "" } }));
      } else {
        toast.error("Failed to send the custom quote.");
      }
    } catch (error) {
      console.error("Error sending custom quote:", error);
      toast.error("An error occurred.");
    }
  };

  const filteredRequests = requests.filter((req) =>
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
        <Link to="/viewQuotes">
          <button className="sidebar-btn">Your Quotes</button>
        </Link>
        <Link to="/viewBookings">
          <button className="sidebar-btn">Your Bookings</button>
        </Link>
      </aside>

      <main className="creator-main">
        <h1 className="page-title">Creator Feed</h1>

        <div className="feed-container">
          <h2>Booking Requests</h2>
          <div className="filter-buttons">
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("open")}>Pending</button>
            <button onClick={() => setFilter("quoted")}>Accepted</button>
            <button onClick={() => setFilter("booked")}>Rejected</button>
          </div>

          <div className="request-list">
            {filteredRequests.map((req) => (
              <div key={req._id} className="request-card">
                <h4>{req.event_type}</h4>
                <p>{req.description}</p>
                <p>Location: {req.location}</p>
                <p>Budget: {req.budget}</p>
                <p>Status: <span className={`status ${req.status}`}>{req.status}</span></p>

                <div className="action-buttons">
                  <button onClick={() => handleAccept(req)}>Accept</button>
                  <button onClick={() => handleReject(req)}>Reject</button>
                  <button
                    onClick={() => navigate(`/client-profile/${req.client._id}`)}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#10b981",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    View Profile
                  </button>
                </div>

                {/* Custom Quote Section */}
                <div className="custom-quote">
                  <h5>Send a Custom Quote</h5>
                  <div className="custom-quote-form">
                    <input
                      type="text"
                      placeholder="Enter your message"
                      value={customInputs[req._id]?.message || ""}
                      onChange={(e) => handleInputChange(req._id, "message", e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Enter your price"
                      value={customInputs[req._id]?.price || ""}
                      onChange={(e) => handleInputChange(req._id, "price", e.target.value)}
                    />
                    <button onClick={() => handleCustomSubmit(req._id)}>
                      Send
                    </button>
                  </div>
                </div>
                {/* End Custom Quote */}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorFeed;