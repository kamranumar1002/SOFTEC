import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreCreators = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [filteredCatalogs, setFilteredCatalogs] = useState([]);
  const [search, setSearch] = useState("");
  const [clientCity, setClientCity] = useState("");


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await res.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "";
          setClientCity(city);
        } catch (error) {
          console.log("Error getting location:", error);
        }
      });
    }
  }, []);


  useEffect(() => {
    fetch("https://your-api-url.com/api/catalogs") 
      .then((res) => res.json())
      .then((data) => {
        setCatalogs(data);
        setFilteredCatalogs(data);
      })
      .catch((err) => console.log("Error fetching catalogs:", err));
  }, []);


  useEffect(() => {
    const searchText = search.toLowerCase();

    const filtered = catalogs.filter((catalog) => {
      const matchCity = clientCity
        ? catalog.creatorLocation?.toLowerCase().includes(clientCity.toLowerCase())
        : true;

      const matchSearch =
        catalog.profileType.toLowerCase().includes(searchText) ||
        catalog.description.toLowerCase().includes(searchText);

      return searchText ? matchSearch : matchCity;
    });

    setFilteredCatalogs(filtered);
  }, [search, clientCity, catalogs]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Explore Professionals Nearby</h2>
      <p style={{ color: "gray" }}>
        Showing results near: <strong>{clientCity || "your area"}</strong>
      </p>

      <input
        type="text"
        placeholder="Search by profile type or description"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", margin: "10px 0" }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {filteredCatalogs.length > 0 ? (
          filteredCatalogs.map((catalog) => (
            <div
              key={catalog._id}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                borderRadius: "8px",
              }}
            >
              <img
                src={catalog.thumbnail || "https://via.placeholder.com/250x150"}
                alt="Catalog Thumbnail"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <h3>{catalog.profileType}</h3>
              <p>{catalog.description}</p>
              <p>📍 {catalog.creatorLocation}</p>

              <Link to={`/requestCreator/${catalog.creatorId}`}>
                <button style={{ marginTop: "8px" }}>Book Now</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No professionals found.</p>
        )}
      </div>
    </div>
  );
};

export default ExploreCreators;