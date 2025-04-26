import React, { useEffect, useState } from "react";
import customFetch from "./interceptors/fetch";

const CreatorProfile = ({ creatorId }) => {
  const [creator, setCreator] = useState(null);
  const [catalogs, setCatalogs] = useState([]);
  const [reviews, setReviews] = useState([]);

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

    fetchCreatorData();
    fetchCatalogs();
    fetchReviews();
  }, [creatorId]);

  if (!creator) return <p>Loading...</p>;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "0 auto",
        backgroundColor: "#1e1e2f",
        color: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Profile Section */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          alignItems: "center",
        }}
      >
        <img
          src={creator.profile_img || "https://via.placeholder.com/150"}
          alt="Creator"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: "3px solid #a855f7",
          }}
        />
        <div>
          <h2 style={{ color: "#a855f7", marginBottom: "10px" }}>
            {creator.fname} {creator.lname}
          </h2>
          <p><strong>Email:</strong> {creator.email}</p>
          <p><strong>Phone:</strong> {creator.phone_no}</p>
          <p><strong>CNIC:</strong> {creator.cnic}</p>
          <p><strong>Profile Type:</strong> {creator.profile_type}</p>
          <p><strong>Budget Range:</strong> {creator.budget_range}</p>
        </div>
      </div>

      {/* Bio Section */}
      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ color: "#a855f7", marginBottom: "10px" }}>Bio</h3>
        <p style={{ backgroundColor: "#2e2e3e", padding: "15px", borderRadius: "8px" }}>
          {creator.bio || "No bio available."}
        </p>
      </div>

      {/* Catalog Section */}
      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ color: "#a855f7", marginBottom: "10px" }}>Catalog</h3>
        {catalogs.length === 0 ? (
          <p>No catalog items available.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {catalogs.map((item) => (
              <div
                key={item._id}
                style={{
                  backgroundColor: "#2e2e3e",
                  padding: "15px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <img
                  src={item.media[0]?.url || "https://via.placeholder.com/150"}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <h4 style={{ color: "#a855f7", marginBottom: "5px" }}>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div>
        <h3 style={{ color: "#a855f7", marginBottom: "10px" }}>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          <div>
            {reviews.map((review) => (
              <div
                key={review._id}
                style={{
                  backgroundColor: "#2e2e3e",
                  padding: "15px",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  border: "1px solid #a855f7",
                }}
              >
                <p>
                  <strong>Reviewer:</strong> {review.reviewer?.fname} {review.reviewer?.lname}
                </p>
                <p>
                  <strong>Rating:</strong> {review.rating} / 5
                </p>
                <p>
                  <strong>Comment:</strong> {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorProfile;