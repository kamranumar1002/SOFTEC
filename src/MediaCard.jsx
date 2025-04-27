import React from 'react';
import { FaPlay } from 'react-icons/fa'; // Import play icon from react-icons

function MediaCard({ fileUrl, fileType, thumbnailUrl }) {
  const isVideo = fileType.startsWith('video/');

  return (
    <div className="relative group w-full aspect-square overflow-hidden bg-gray-100">
      {isVideo ? (
        <>
          <img
            className="w-full h-full object-cover"
            src={thumbnailUrl || fileUrl}
            alt="Video thumbnail"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white opacity-75 bg-black/30 p-3 rounded-full">
              <FaPlay size={20} />
            </div>
          </div>
        </>
      ) : (
        <img
          className="w-full h-full object-cover"
          src={fileUrl}
          alt="Media content"
          loading="lazy"
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Add any hover effects here */}
      </div>
    </div>
  );
}

export default MediaCard;