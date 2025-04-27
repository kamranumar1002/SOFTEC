import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customFetch from "./interceptors/fetch";
import ClientSidebar from "./ClientSidebar";

const ViewQuotes = () => {
  const { requestId } = useParams(); // Get request ID from URL
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await customFetch(`http://localhost:5000/api/quotes/${requestId}`);
        if (!res.ok) throw new Error("Failed to fetch quotes");
        const data = await res.json();
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error.message);
        navigate("/requests"); // Redirect if error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [requestId, navigate]);

  const handleAcceptQuote = async (quoteId) => {
    try {

      // Create a booking
      const bookingRes = await customFetch(`http://localhost:5000/api/bookings/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          quoteId: quoteId,
        },
      });

      if (!bookingRes.ok) throw new Error("Failed to create booking");

      alert("Quote accepted and booking created successfully!");
      navigate("/requests"); // Redirect to requests page
    } catch (error) {
      console.error("Error accepting quote:", error.message);
      alert("An error occurred while accepting the quote.");
    }
  };

  const handleRejectQuote = async (quoteId) => {
    try {
      // Update the quote to rejected
      const res = await customFetch(`http://localhost:5000/api/quotes/status`, {
        method: "PUT",
        body: { status : "rejected", quoteId: quoteId },
      });

      if (!res.ok) throw new Error("Failed to reject quote");

      alert("Quote rejected successfully.");
      setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote._id !== quoteId)); // Remove rejected quote from UI
    } catch (error) {
      console.error("Error rejecting quote:", error.message);
      alert("An error occurred while rejecting the quote.");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#555" }}>
        Loading quotes...
      </div>
    );
  }

  return (
    <div className="client-feed-wrapper">
      <ClientSidebar />
      <div style={{ padding: "20px", marginLeft: "2vw", marginTop: "5vh", width: "80vw" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Quotes for Request</h2>
        {quotes.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555", fontSize: "18px" }}>
            No quotes available for this request.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {quotes.map((quote) => (
              <div
                key={quote._id}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #eee",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                }}
              >
                <h3 style={{ margin: "0 0 12px", color: "#111", fontSize: "20px" }}>
                  Quoted By: {quote.creator.fname} {quote.creator.lname}
                </h3>
                <p style={{ margin: "0 0 10px", color: "#555", fontSize: "14px" }}>
                  💰 Quoted Amount: Rs {quote.proposed_amount}
                </p>
                <p style={{ margin: "0 0 10px", color: "#777", fontSize: "13px" }}>
                  📝 Message: {quote.message || "No message provided."}
                </p>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button
                        onClick={() => handleAcceptQuote(quote._id, quote.creator._id)}
                        style={{
                        padding: "10px 20px",
                        backgroundColor: "black", // Primary color (e.g., blue)
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        }}
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => handleRejectQuote(quote._id)}
                        style={{
                        padding: "10px 20px",
                        backgroundColor: "gray", // Secondary or warning color (e.g., yellow)
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        }}
                    >
                        Reject
                    </button>
                    </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewQuotes;