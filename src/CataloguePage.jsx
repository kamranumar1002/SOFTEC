import { useEffect, useState } from 'react';
import { getCreatorCatalogues, deleteCatalogue } from '../services/CatalogueService';

const CataloguePage = ({ creatorId, token }) => {
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCatalogues();
  }, []);

  const fetchCatalogues = async () => {
    try {
      const data = await getCreatorCatalogues(creatorId);
      setCatalogues(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteCatalogue(id, token);
      setCatalogues(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) return <div className="text-gray-600 p-4">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Your Catalogues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {catalogues.map(cat => (
          <div key={cat._id} className="border border-gray-300 rounded p-4 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-black">{cat.title}</h2>
            <p className="text-gray-600">{cat.description}</p>
            <div className="flex gap-4 mt-4">
              <button 
                onClick={() => handleDelete(cat._id)} 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CataloguePage;
