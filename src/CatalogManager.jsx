import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import customFetch from './interceptors/fetch';

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
      const res = await customFetch("https://your-api-url.com/api/profile/me")
      const data = await res.json();
      setCreatorProfileId(data.creatorId);
      fetchCatalogs(data.creatorId);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if(localStorage.getItem('access_token') === null){                   
        navigate('/login');
    }else{
    fetchCreatorData();
    }
  }, []);

  const fetchCatalogs = async (creatorId) => {
    try {
      const res = await customFetch(`https://your-api-url.com/api/catalogues/creator/${creatorId}`);
      const data = await res.json();
      setCatalogs(data);
    } catch (error) {
      console.error("Error fetching catalog:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { creatorProfileId, profileType, cdnLink, description, thumbnailImage };

    try {
      const res = await customFetch("https://your-api-url.com/api/catalogues", {
        method: "POST",
        body: JSON.stringify(payload),
      });

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
      await customFetch(`https://your-api-url.com/api/catalogues/${id}`, {
        method: "DELETE",
      });
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
