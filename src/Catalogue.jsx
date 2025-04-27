import React from 'react'

const Catalogue = ({creator, categories, selectedCategory, handleCategoryFilter, filteredCatalog, handleMediaClick}) => {
  return (
    <>
    {/* Catalog Section */}
    <h3 style={{ color: "#222", fontSize: "24px", marginBottom: "20px" }}>
    {creator.fname}'s Catalog
  </h3>
  <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => handleCategoryFilter(category)}
        style={{
          padding: "10px 20px",
          background: selectedCategory === category ? "#333" : "#eee",
          color: selectedCategory === category ? "#fff" : "#000",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {category}
      </button>
    ))}
  </div>
  {filteredCatalog.length > 0 ? (
    <div
      style={{
        display: "flex",
        gap: "20px",
        overflowX: "auto", // Enable horizontal scrolling
        paddingBottom: "10px",
      }}
    >
      {filteredCatalog.map((item) =>
        item.media.map((media) => (
          <div
            key={media.url}
            style={{
              minWidth: "300px", // Ensure consistent card width
              backgroundColor: "#fff",
              border: "1px solid #eee",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
              position: "relative", // For overlaying play button
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onClick={() => handleMediaClick(media)} // Open modal on click
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {media.type === "image" ? (
              <img
                src={media.url}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <>
                <img
                  src={media.thumbnail || media.url} // Use thumbnail if available
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                {/* Play Button Overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    width="36px"
                    height="36px"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  ) : (
    <p style={{ color: "#555", fontSize: "16px" }}>
      No catalog items available.
    </p>
  )}
  </>
  )
}

export default Catalogue