import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "./interceptors/fetch";

const ExploreCreators = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clientCity, setClientCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Get user location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await res.json();
              const city =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                "Unknown";
              setClientCity(city);
            },
            (error) => {
              console.error("Geolocation error:", error);
              setClientCity("Unknown");
            }
          );
        }

        // Fetch creator data
        const res = await customFetch("http://localhost:5000/api/creators");
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setCatalogs(data);
      } catch (error) {
        console.error("Error fetching creators:", error.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Explore Creators in {clientCity}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {catalogs.length > 0 ? (
          catalogs.map((creator) => (
            <div
              key={creator._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ margin: "0 0 10px" }}>
                {creator.fname} {creator.lname}
              </h3>
              <p style={{ margin: "0 0 8px", color: "#555" }}>
                📍 {creator.creatorLocation}
              </p>
              <p style={{ margin: "0 0 8px", color: "#777" }}>
                ✉️ {creator.email}
              </p>
              <button
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => alert(`Contacting ${creator.fname}...`)}
              >
                Contact
              </button>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#777" }}>
            No creators found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExploreCreators;