import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "./interceptors/fetch";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'; // Important for modal styles

const ExploreCreators = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clientCity, setClientCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [globalSearch, setGlobalSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [formData, setFormData] = useState({
    event_date: '',
    budget: '',
    location: '',
    description: '',
    event_type: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      const role = localStorage.getItem("role");
      if (!token || role !== "client") {
        navigate("/login");
        return;
      }

      try {
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
                (data.address.district && data.address.district.replace("District", "").trim()) ||
                "Unknown";
              if(city === "Unknown")
                globalSearch(true);
              setClientCity(city);
            },
            (error) => {
              console.error("Geolocation error:", error);
              setClientCity("Unknown");
            }
          );
        }

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

  const handleOpenModal = (creator) => {
    setSelectedCreator(creator);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedCreator(null);
    setFormData({
      event_date: '',
      budget: '',
      location: '',
      description: ''
    });
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        creator: selectedCreator._id,
        client: localStorage.getItem("user_id"),
        ...formData
      };

      const res = await customFetch('http://localhost:5000/api/requests', {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        payload
      });
      if (res.status === 201) {
        alert("Booking request sent!");
        handleCloseModal();
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending booking request.");
    }
  };

  const cityFilteredCatalogs = globalSearch || clientCity === "Unknown" || clientCity === ""
    ? catalogs
    : catalogs.filter((creator) =>
        creator.creatorLocation &&
        clientCity &&
        creator.creatorLocation.toLowerCase() === clientCity.toLowerCase()
      );

  const finalCatalogs = cityFilteredCatalogs.filter((creator) => {
    const fullName = `${creator.fname} ${creator.lname}`.toLowerCase();
    const profileType = (creator.profile_type || "").toLowerCase();
    const city = (creator.creatorLocation || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    return (
      fullName.includes(search) ||
      profileType.includes(search) ||
      city.includes(search)
    );
  });

  if (loading) return (
    <div style={{ color: "#333", textAlign: "center", marginTop: "50px" }}>
      Loading...
    </div>
  );

  return (
    <div style={{ padding: "40px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h2 style={{ color: "#222", fontSize: "32px", marginBottom: "20px", textAlign: "center" }}>
        {globalSearch || clientCity === "Unknown" || clientCity === "" ? "Explore All Creators" : `Explore Creators in ${clientCity}`}
      </h2>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search by name, city, profile type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 15px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "10px",
            fontSize: "14px",
          }}
        />
        <button
          onClick={() => setGlobalSearch(!globalSearch)}
          style={{
            padding: "10px 20px",
            backgroundColor: globalSearch ? "#999" : "black",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {globalSearch ? "Searching Globally" : "Search Globally?"}
        </button>
      </div>

      {/* Creators List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          marginTop: "20px",
        }}
      >
        {finalCatalogs.length > 0 ? (
          finalCatalogs.map((creator) => (
            <div
              key={creator._id}
              style={cardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {creator.profile_img && (
                <img
                  src={creator.profile_img}
                  alt={`${creator.fname} ${creator.lname}`}
                  style={imageStyle}
                />
              )}
              <div style={{ padding: "20px" }}>
                <h3 style={{ margin: "0 0 12px", color: "#111", fontSize: "22px" }}>
                  {creator.fname} {creator.lname}
                </h3>

                <p style={{ margin: "0 0 10px", color: "#555", fontSize: "14px" }}>
                  📍 {creator.creatorLocation}
                </p>
                {creator.profile_type && <p style={{ margin: "0 0 10px", color: "#555", fontSize: "14px" }}>
                  🏷️ {creator.profile_type}
                </p>}
                <p style={{ margin: "0 0 20px", color: "#777", fontSize: "13px" }}>
                  ✉️ {creator.email}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  <button style={buttonStyle} onClick={() => alert(`Viewing ${creator.fname}'s Profile...`)}>
                    View Profile
                  </button>
                  <button style={buttonStyle} onClick={() => handleOpenModal(creator)}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#555", fontSize: "18px" }}>
            No creators found.
          </p>
        )}
      </div>

      {/* Modal Popup */}
      <Modal style={{ borderRadius: "12px"}} open={open} onClose={handleCloseModal} center>
      <div style={{ padding: "50px", textAlign: "center", backgroundColor: "#fff" }}>
        <h2 style={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}>
          Book {selectedCreator?.fname} {selectedCreator?.lname}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="date"
            name="event_date"
            value={formData.event_date}
            onChange={handleFormChange}
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
            type="text"
            name="location"
            value={formData.location}
            onChange={handleFormChange}
            placeholder="Event Location"
            required
            style={inputStyle}
          />
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
            placeholder="Additional Details (optional)"
            rows="4"
            style={{ ...inputStyle, resize: "none" }}
          ></textarea>

          <button type="submit" style={{ ...buttonStyle, backgroundColor: "#111" }}>
            Submit Booking Request
          </button>
        </form>
        </div>
      </Modal>
    </div>
  );
};

// Styles
const buttonStyle = {
  flex: "1",
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
  width: "30vw",
  boxSizing: "border-box",
  outline: "none",
  transition: "border-color 0.3s",
};

const cardStyle = {
  backgroundColor: "#fff",
  border: "1px solid #eee",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease",
};

const imageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
};

export default ExploreCreators;
