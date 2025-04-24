import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customFetch from "./interceptors/fetch";

const RequestCreator = () => {
  const { creatorId } = useParams();
  const [creator, setCreator] = useState(null);
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await customFetch("https://your-api-url.com/api/profile/me");
        const userData = await response.json();
        setClientId(userData.clientId); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch creator data
  useEffect(() => {
    customFetch(`https://your-api-url.com/api/creators/${creatorId}`)
      .then((res) => res.json())
      .then((data) => setCreator(data))
      .catch((err) => console.log("Error:", err));
  }, [creatorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientId) {
      alert("You need to be logged in to make a booking.");
      return;
    }

    const requestPayload = {
      creatorId: creator._id,
      clientId,
      location: creator.location,
      eventType,
      startTime,
      endTime,
      eventDate,
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await customFetch("https://your-api-url.com/api/requests", {
        method: "POST",
        body: JSON.stringify(requestPayload),
      });

      const result = await res.json();
      alert("Request submitted successfully!");
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  if (!creator) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book {creator.name}</h2>
      <p>📍 Location: {creator.location}</p>
      <p>💸 Price: Rs. {creator.price}</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Event Type (e.g. Wedding)"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          required
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <button type="submit">Submit Booking Request</button>
      </form>
    </div>
  );
};

export default RequestCreator;
