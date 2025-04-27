import React, { useEffect, useState } from "react";
import customFetch from "./interceptors/fetch";

const CreatorProfile = ({ creatorId }) => {
  const [creator, setCreator] = useState(null);
  const [catalogs, setCatalogs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [services, setServices] = useState([]); // New state for services

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const res = await customFetch(`http://localhost:5000/api/creators/${creatorId}`);
        const data = await res.json();
        setCreator(data);
      } catch (error) {
        console.error("Error fetching creator data:", error);
      }
    };

    const fetchCatalogs = async () => {
      try {
        const res = await customFetch(`http://localhost:5000/api/catalogues/creator/${creatorId}`);
        const data = await res.json();
        setCatalogs(data);
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await customFetch(`http://localhost:5000/api/reviews/${creatorId}`);
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const fetchServices = async () => {  // New function for fetching services
      try {
        const res = await customFetch(`http://localhost:5000/api/services/creator/${creatorId}`);
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchCreatorData();
    fetchCatalogs();
    fetchReviews();
    fetchServices(); // Fetch services too
  }, [creatorId]);

  if (!creator) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div style={wrapperStyle}>
      {/* Profile Section */}
      <div style={profileSectionStyle}>
        <img
          src={creator.profile_img || "https://via.placeholder.com/150"}
          alt="Creator"
          style={profileImgStyle}
        />
        <div>
          <h2 style={titleStyle}>{creator.fname} {creator.lname}</h2>
          <p><strong>Email:</strong> {creator.email}</p>
          <p><strong>Phone:</strong> {creator.phone_no}</p>
          <p><strong>CNIC:</strong> {creator.cnic}</p>
          <p><strong>Profile Type:</strong> {creator.profile_type}</p>
          <p><strong>Budget Range:</strong> {creator.budget_range}</p>
        </div>
      </div>

      {/* Bio Section */}
      <div style={sectionWrapperStyle}>
        <h3 style={sectionTitleStyle}>Bio</h3>
        <p style={bioStyle}>
          {creator.bio || "No bio available."}
        </p>
      </div>

      {/* Catalog Section */}
      <div style={sectionWrapperStyle}>
        <h3 style={sectionTitleStyle}>Catalog</h3>
        {catalogs.length === 0 ? (
          <p>No catalog items available.</p>
        ) : (
          <div style={catalogGridStyle}>
            {catalogs.map((item) => (
              <div key={item._id} style={cardStyle}>
                <img
                  src={item.media[0]?.url || "https://via.placeholder.com/150"}
                  alt={item.title}
                  style={catalogImgStyle}
                />
                <h4 style={cardTitleStyle}>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Services Section (NEW) */}
      <div style={sectionWrapperStyle}>
        <h3 style={sectionTitleStyle}>Services</h3>
        {services.length === 0 ? (
          <p>No services available.</p>
        ) : (
          <div style={catalogGridStyle}>
            {services.map((service) => (
              <div key={service._id} style={cardStyle}>
                <h4 style={cardTitleStyle}>{service.title}</h4>
                <p>{service.description}</p>
                <p><strong>Price:</strong> {service.price} PKR</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div style={sectionWrapperStyle}>
        <h3 style={sectionTitleStyle}>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {reviews.map((review) => (
              <div key={review._id} style={reviewCardStyle}>
                <p><strong>Reviewer:</strong> {review.reviewer?.fname} {review.reviewer?.lname}</p>
                <p><strong>Rating:</strong> {review.rating} / 5</p>
                <p><strong>Comment:</strong> {review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorProfile;

// Styles
const wrapperStyle = {
  padding: "40px",
  maxWidth: "1000px",
  margin: "40px auto",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
};

const profileSectionStyle = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
  marginBottom: "40px",
};

const profileImgStyle = {
  width: "150px",
  height: "150px",
  objectFit: "cover",
  borderRadius: "50%",
  border: "3px solid #a855f7",
};

const titleStyle = {
  color: "#a855f7",
  fontSize: "28px",
  marginBottom: "10px",
};

const sectionWrapperStyle = {
  marginBottom: "50px",
};

const sectionTitleStyle = {
  color: "#a855f7",
  fontSize: "24px",
  marginBottom: "15px",
};

const bioStyle = {
  backgroundColor: "#fff",
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "16px",
  lineHeight: "1.6",
};

const catalogGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  textAlign: "center",
  transition: "transform 0.3s",
};

const cardTitleStyle = {
  color: "#a855f7",
  margin: "10px 0 5px",
};

const catalogImgStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "10px",
};

const reviewCardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid #a855f7",
  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
};
