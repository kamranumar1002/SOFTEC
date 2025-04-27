import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "./interceptors/fetch";
import ClientSidebar from "./ClientSidebar";

const NewRequest = () => {
  const [formData, setFormData] = useState({
    event_type: '',
    description: '',
    location: '',
    budget: '',
    event_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await customFetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: formData
      });

      if (res.status === 201) {
        setSuccess(true);
        alert("Request created successfully!");
        redirectToRequests();
      } else {
        throw new Error("Failed to create request.");
      }
    } catch (err) {
      setError(err.message);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const redirectToRequests = () => {
    navigate("/requests");
  };

  return (
    <div className="client-feed-wrapper">
      <ClientSidebar />
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9", minHeight: "100vh", marginLeft: "5vw", width: "60vw" }}>
      <h2 style={{ color: "#222", fontSize: "32px", marginBottom: "20px", textAlign: "center" }}>
        Create New Request
      </h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "500px", margin: "0 auto" }}>
        <input
          type="text"
          name="event_type"
          value={formData.event_type}
          onChange={handleFormChange}
          placeholder="Event Type"
          required
          style={inputStyle}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          placeholder="Description"
          rows="4"
          required
          style={{ ...inputStyle, resize: "none" }}
        ></textarea>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleFormChange}
          placeholder="Location"
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleFormChange}
          placeholder="Budget (Rs)"
          required
          style={inputStyle}
        />
        <input
          type="date"
          name="event_date"
          value={formData.event_date}
          onChange={handleFormChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={{ ...buttonStyle, backgroundColor: "#111" }} disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </div>
    </div>
  );
};

// Styles
const buttonStyle = {
  padding: "10px 14px",
  backgroundColor: "#000",
  color: "#fff",
  border: "1px solid #000",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  transition: "all 0.3s ease",
};

const inputStyle = {
  padding: "12px 15px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "14px",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
  transition: "border-color 0.3s",
};

export default NewRequest;