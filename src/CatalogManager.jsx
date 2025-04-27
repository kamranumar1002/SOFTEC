import React, { useState, useEffect } from 'react';
import MediaCard from './MediaCard';
import customFetch from './interceptors/fetch';
import { useNavigate } from 'react-router-dom';

function CatalogManager() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCatalogs = async (category) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = category === 'all' 
        ? 'http://localhost:5000/api/catalogues/all'
        : `http://localhost:5000/api/catalogues/category/${category}`;
      
      const response = await customFetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch catalogs');
      }
      const data = await response.json();
      setCatalogs(data);
    } catch (err) {
      console.error('Error fetching catalogs:', err);
      setError('Failed to load catalogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchCatalogs(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-lg">Catalog - Category:</span>
          <select 
            className="border border-gray-300 rounded px-4 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>Select Profile Type</option>
            <option value="all">All Categories</option>
            <option value="wedding">Wedding</option>
            <option value="product">Product</option>
            <option value="fashion">Fashion</option>
            <option value="event">Event</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="portrait">Portrait</option>
          </select>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
          onClick={() => navigate('/create-catalogue')}
        >
          Add Post
        </button>
      </div>

      {loading && (
        <div className="text-center py-10">
          <p className="text-gray-600">Loading catalogs...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalogs.map((catalog) => (
          catalog.media.map((mediaItem, index) => (
            <MediaCard
              key={`${catalog._id}-${index}`}
              fileUrl={mediaItem?.url}
              fileType={mediaItem?.type}
              thumbnailUrl={mediaItem?.thumbnailUrl}              
            />
          ))
        ))}
      </div>
    </div>
  );
}

export default CatalogManager;