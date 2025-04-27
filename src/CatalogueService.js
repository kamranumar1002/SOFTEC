const API_URL = 'https://localhost:5000/api/catalogues';

export const createCatalogue = async (formData, token) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });
  if (!res.ok) throw new Error('Failed to create catalogue');
  return await res.json();
};

export const getCreatorCatalogues = async (creatorId) => {
  const res = await fetch(`${API_URL}/creator/${creatorId}`);
  if (!res.ok) throw new Error('Failed to fetch catalogues');
  return await res.json();
};

export const getCatalogueById = async (catalogueId) => {
  const res = await fetch(`${API_URL}/id/${catalogueId}`);
  if (!res.ok) throw new Error('Failed to fetch catalogue');
  return await res.json();
};

export const getCataloguesByCategory = async (categoryId) => {
  const res = await fetch(`${API_URL}/category/${categoryId}`);
  if (!res.ok) throw new Error('Failed to fetch catalogues');
  return await res.json();
};

export const deleteCatalogue = async (catalogueId, token) => {
  const res = await fetch(`${API_URL}/${catalogueId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to delete catalogue');
  return await res.json();
};
