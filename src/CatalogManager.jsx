import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "./interceptors/fetch";

const CatalogManager = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [profileType, setProfileType] = useState("");
  const [cdnLink, setCdnLink] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [creatorProfileId, setCreatorProfileId] = useState("");
  const navigate = useNavigate();

  const fetchCreatorData = async () => {
    try {
      const res = await customFetch("http://localhost:5000/api/profile/me");
      if (!res.ok) {
        throw new Error("Failed to fetch creator data");
      }
      const data = await res.json();
      setCreatorProfileId(data.creatorId);
      fetchCatalogs(data.creatorId);
    } catch (error) {
      console.error("Error fetching creator data:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    } else {
      fetchCreatorData();
    }
  }, [navigate]);

  const fetchCatalogs = async (creatorId) => {
    try {
      const res = await customFetch(`http://localhost:5000/api/catalogues/creator/${creatorId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch catalogs");
      }
      const data = await res.json();
      setCatalogs(data);
    } catch (error) {
      console.error("Error fetching catalogs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { creatorProfileId, profileType, cdnLink, description, thumbnailImage };

    try {
      const res = await customFetch("http://localhost:5000/api/catalogues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to upload catalog");
      }

      const data = await res.json();
      alert("Catalog uploaded successfully!");
      setCatalogs([...catalogs, data]);
      setProfileType("");
      setCdnLink("");
      setDescription("");
      setThumbnailImage("");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await customFetch(`http://localhost:5000/api/catalogues/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete catalog");
      }

      setCatalogs(catalogs.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="catalog-manager">
      <h2 className="section-title">Manage Your Portfolio</h2>
      <form className="catalog-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Profile Type (e.g. Wedding, Product)"
          value={profileType}
          onChange={(e) => setProfileType(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CDN Link to the Work"
          value={cdnLink}
          onChange={(e) => setCdnLink(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Thumbnail Image URL"
          value={thumbnailImage}
          onChange={(e) => setThumbnailImage(e.target.value)}
          required
        />
        <button type="submit">Upload Catalog</button>
      </form>

      <h3 className="section-subtitle">Your Catalog</h3>
      <div className="catalog-grid">
        {catalogs.map((item) => (
          <div key={item._id} className="catalog-card">
            <img src={item.thumbnailImage} alt="thumbnail" />
            <h4>{item.profileType}</h4>
            <p>{item.description}</p>
            <a href={item.cdnLink} target="_blank" rel="noreferrer">
              View Full Work
            </a>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogManager;
