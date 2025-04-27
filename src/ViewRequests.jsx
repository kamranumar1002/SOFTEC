import { FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import customFetch from "./interceptors/fetch";
import { useNavigate } from "react-router-dom";
import ClientSidebar from "./ClientSidebar";

const ViewRequests = () => {
  const [tab, setTab] = useState("open"); // Default tab
  const [requests, setRequests] = useState([]);
  const [creators, setCreators] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      navigate("/login");
    } else {
      customFetch(`http://localhost:5000/api/requests/${localStorage.getItem("user_id")}`)
        .then((res) => res.json())
        .then((data) => {
          // Sort requests by latest created first
          const sortedRequests = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setRequests(sortedRequests);

          // Fetch creator details for requests with creator IDs
          const creatorIds = sortedRequests
            .filter((req) => req.creator)
            .map((req) => req.creator);

          if (creatorIds.length > 0) {
            customFetch(`http://localhost:5000/api/creators?ids=${creatorIds.join(",")}`)
              .then((res) => res.json())
              .then((creatorData) => {
                const creatorMap = {};
                creatorData.forEach((creator) => {
                  creatorMap[creator._id] = creator;
                });
                setCreators(creatorMap);
              })
              .catch((err) => console.error("Error fetching creators:", err));
          }
        })
        .catch((err) => console.error("Error fetching requests:", err));
    }
  }, [tab, navigate]);

  const handleDeleteRequest = async (requestId) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        const res = await customFetch(`http://localhost:5000/api/requests/${requestId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setRequests((prevRequests) => prevRequests.filter((req) => req._id !== requestId));
          alert("Request deleted successfully.");
        } else {
          alert("Failed to delete the request.");
        }
      } catch (error) {
        console.error("Error deleting request:", error);
        alert("An error occurred while deleting the request.");
      }
    }
  };

  const handleRequestClick = (requestId, quotes_count) => {
    if (quotes_count > 0) {
      navigate(`/quotes/${requestId}`);
    }
  };

  const filteredRequests = requests.filter((req) => req.status === tab);

  return (
    <div className="client-feed-wrapper">
      <ClientSidebar />
      <div style={{ padding: "20px", marginLeft: "2vw", marginTop: "5vh", width: "80vw" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>My Booking Requests</h2>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "40px" }}>
          {["open", "booked", "completed"].map((type) => (
            <button
              key={type}
              onClick={() => setTab(type)}
              style={{
                padding: "10px 20px",
                background: tab === type ? "#333" : "#eee",
                color: tab === type ? "#fff" : "#000",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {filteredRequests.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555", fontSize: "18px" }}>
            No {tab} requests.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredRequests.map((req) => (
              <div
                key={req._id}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #eee",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease",
                  cursor: req.quotes_count > 0 ? "pointer" : "default", // Make clickable if quotes exist
                }}
                onClick={() => req.status === "open" ? handleRequestClick(req._id, req.quotes_count) : ""} // Redirect if quotes exist
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ margin: "0 0 12px", color: "#111", fontSize: "20px" }}>
                    Event Type: {req.event_type}
                  </h3>
                  <FaTrash
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the click handler
                      handleDeleteRequest(req._id);
                    }}
                    style={{
                      color: "#d9534f",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                    title="Delete Request"
                  />
                </div>
                <p style={{ margin: "0 0 10px", color: "#555", fontSize: "14px" }}>
                  📍 Location: {req.location}
                </p>
                <p style={{ margin: "0 0 10px", color: "#555", fontSize: "14px" }}>
                  💰 Budget: Rs {req.budget}
                </p>
                <p style={{ margin: "0 0 10px", color: "#555", fontSize: "14px" }}>
                  📅 Event Date: {new Date(req.event_date).toLocaleDateString()}
                </p>
                <p style={{ margin: "0 0 10px", color: "#777", fontSize: "13px" }}>
                  📝 Description: {req.description}
                </p>
                <p style={{ margin: "0 0 10px", color: "#777", fontSize: "13px" }}>
                  📌 Status: {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </p>
                {req.status === "open" && <p style={{ margin: "0 0 10px", color: "#777", fontSize: "13px" }}>
                  💬 Quotes: {req.quotes_count || 0}
                </p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRequests;