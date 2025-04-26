import React, { useEffect, useState } from "react";
import customFetch from "./interceptors/fetch";
import { useParams } from "react-router-dom";

const ClientProfile = () => {
  const { client_id } = useParams(); // Get client ID from URL
  const [profile, setProfile] = useState(null); // State for client profile
  const [reviews, setReviews] = useState([]); // State for client reviews
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await customFetch(`http://localhost:5000/api/profile/${client_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile.");
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await customFetch(`http://localhost:5000/api/reviews/client/${client_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews.");
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchProfile(), fetchReviews()]);
      setLoading(false);
    };

    fetchData();
  }, [client_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <p>{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <p>Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black min-h-screen text-white">
      {/* Profile Info */}
      <div className="flex flex-col items-center mb-12">
        <img
          src={profile.profile_img || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-700 mb-4"
        />
        <h2 className="text-3xl font-bold mb-1">{profile.fname} {profile.lname}</h2>
        <p className="text-gray-400">@{profile.username}</p>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 mb-12">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg">{profile.email || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone Number</p>
          <p className="text-lg">{profile.phone_no || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">CNIC</p>
          <p className="text-lg">{profile.cnic || "N/A"}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-center">Client Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold">{review.reviewerName}</h4>
                  <span className="text-sm text-gray-400">{review.rating} / 5 ⭐</span>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientProfile;