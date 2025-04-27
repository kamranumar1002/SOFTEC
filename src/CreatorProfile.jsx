import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customFetch from "./interceptors/fetch";
import ClientSidebar from "./ClientSidebar"; // Import the sidebar component
import Modal from "react-responsive-modal"; // Install this package: npm install react-responsive-modal
import "react-responsive-modal/styles.css"; // Import modal styles
import Catalogue from "./Catalogue";

const CreatorProfile = () => {
  const { creatorId } = useParams(); // Get creator ID from URL
  const [creator, setCreator] = useState(null);
  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedMedia, setSelectedMedia] = useState(null); // Selected media for preview
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const creatorRes = await customFetch(`http://localhost:5000/api/creators/${creatorId}`);
        if (!creatorRes.ok) throw new Error("Creator not found");
        const creatorData = await creatorRes.json();
        setCreator(creatorData);

        const catalogRes = await customFetch(`http://localhost:5000/api/catalogues/creator/${creatorId}`);
        if (!catalogRes.ok) throw new Error("Error fetching catalog");
        const catalogData = await catalogRes.json();
        setCatalog(catalogData);
        setFilteredCatalog(catalogData);

        const categorySet = new Set(catalogData.map((item) => item.category?.name || "Uncategorized"));
        setCategories(["All", ...Array.from(categorySet)]);

        const reviewsRes = await customFetch(`http://localhost:5000/api/reviews/${creatorId}`);
        if (!reviewsRes.ok) throw new Error("Error fetching reviews");
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching creator profile:", error.message);
        navigate("/explore"); // Redirect if creator not found
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorData();
  }, [creatorId, navigate]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredCatalog(catalog);
    } else {
      setFilteredCatalog(catalog.filter((item) => item.category?.name === category));
    }
  };

  const handleMediaClick = (media) => {
    setSelectedMedia(media); // Set the selected media
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedMedia(null); // Clear the selected media
  };

  if (loading) {
    return (
      <div style={{ color: "#333", textAlign: "center", marginTop: "50px" }}>
        Loading...
      </div>
    );
  }

  if (!creator) {
    return (
      <div style={{ color: "#333", textAlign: "center", marginTop: "50px" }}>
        Creator not found.
      </div>
    );
  }

  return (
    <div className="client-feed-wrapper">
      <ClientSidebar />
      <div style={{ padding: "40px", backgroundColor: "#f9f9f9", minHeight: "100vh", marginLeft: "2vw" }}>
        {/* Creator Details */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
          <img
            src={creator.profile_img || "https://via.placeholder.com/150"}
            alt={`${creator.fname} ${creator.lname}`}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #eee",
            }}
          />
          <div>
            <h2 style={{ color: "#222", fontSize: "28px", marginBottom: "10px" }}>
              {creator.fname} {creator.lname}
            </h2>
            <p style={{ color: "#555", fontSize: "16px", marginBottom: "10px" }}>
              📍 {creator.creatorLocation}
            </p>
            <p style={{ color: "#555", fontSize: "16px", marginBottom: "10px" }}>
              ✉️ {creator.email}
            </p>
            <p style={{ color: "#555", fontSize: "16px", marginBottom: "10px" }}>
              ⭐ {creator.rating || "No rating yet"}
            </p>
            <p style={{ color: "#777", fontSize: "14px", marginBottom: "10px" }}>
              {creator.bio || "No bio available."}
            </p>
          </div>
        </div>

        <Catalogue creator={creator} categories={categories} selectedCategory = {selectedCategory} handleCategoryFilter={handleCategoryFilter} filteredCatalog = {filteredCatalog} handleMediaClick={handleMediaClick}/>

        {/* Reviews Section */}
        <h3 style={{ color: "#222", fontSize: "24px", marginTop: "40px", marginBottom: "20px" }}>
          Reviews
        </h3>
        {reviews.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {reviews.map((review) => (
              <div
                key={review._id}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #eee",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                }}
              >
                <h4 style={{ margin: "0 0 10px", color: "#111", fontSize: "18px" }}>
                  Rating: ⭐ {review.rating}
                </h4>
                <p style={{ margin: "0 0 10px", color: "#555", fontSize: "14px" }}>
                  {review.comment || "No comment provided."}
                </p>
                <p style={{ margin: "0", color: "#777", fontSize: "13px" }}>
                  Reviewed by: {review.reviewerType}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#555", fontSize: "16px" }}>
            No reviews available.
          </p>
        )}

        {/* Modal for Media Preview */}
        {/* Modal for Media Preview */}
        <Modal open={isModalOpen} onClose={closeModal} center>
          {selectedMedia && selectedMedia.type === "image" ? (
            <img
              src={selectedMedia.url}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          ) : (
            <video
              src={selectedMedia?.url}
              controls
              autoPlay
              style={{
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          )}
        </Modal>
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
