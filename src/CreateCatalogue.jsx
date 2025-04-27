import { useState } from 'react';
import { createCatalogue } from './CatalogueService';
import { useNavigate } from 'react-router-dom';
import customFetch from './interceptors/fetch';

const CreateCatalogue = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    for (let file of media) {
      formData.append('media', file);
    }
    try {
      setLoading(true);
      await customFetch('http://localhost:5000/api/catalogues/create',  {
      method: 'POST',
      body : formData
      });
      alert('Catalogue created!');
      navigate('/catalogManager');
      setTitle('');
      setDescription('');
      setCategory('');
      setMedia([]);
    } catch (err) {
      console.error(err.message);
      alert('Failed to create catalogue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-900 p-8 rounded-2xl shadow-md">
        
        {/* Top Heading */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">Create Catalogue</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          <div>
            <label className="block text-gray-400 text-sm mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            >
              <option value="">Select Category</option>
              <option value="wedding">Wedding</option>
              <option value="product">Product</option>
              <option value="fashion">Fashion</option>
              <option value="event">Event</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="portrait">Portrait</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Upload Media</label>
            <input
              type="file"
              multiple
              onChange={(e) => setMedia([...e.target.files])}
              className="w-full bg-gray-800 border border-gray-700 text-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              accept="image/*,video/*"
            />
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={() => navigate('/catalogManager')}
              className="w-1/3 border border-white text-white py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-2/3 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              {loading ? 'Creating...' : 'Create Catalogue'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateCatalogue;
