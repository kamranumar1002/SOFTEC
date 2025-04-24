import React, { useEffect, useState } from "react";
import customFetch from "./interceptors/fetch";

const ViewCreatorReview = () => {
  const [reviews, setReviews] = useState([]);
  const [creatorId, setCreatorId] = useState("");

  useEffect(() => {
    const fetchCreatorId = async () => {
      try {
        const res = await customFetch("https://your-api-url.com/api/profile/me");
        const data = await res.json();
        setCreatorId(data.creatorId);
      } catch (err) {
        console.error("Error fetching creator ID:", err);
      }
    };

    fetchCreatorId();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!creatorId) return;

      try {
        const res = await customFetch(`https://your-api-url.com/api/reviews/${creatorId}`);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [creatorId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Ratings & Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {reviews.map((review) => (
            <li
              key={review.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p><strong>Rating:</strong> {review.rating} ⭐</p>
              <p><strong>Review:</strong> {review.review}</p>
              <p><strong>On Time:</strong> {review.arrivedontime ? "✅ Yes" : "❌ No"}</p>
              <p><strong>Professional:</strong> {review.wasprofessional ? "✅ Yes" : "❌ No"}</p>
              <p><strong>Satisfaction:</strong> {review.satisfaction}</p>
              <p><em>{new Date(review.datetime).toLocaleString()}</em></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewCreatorReview;
