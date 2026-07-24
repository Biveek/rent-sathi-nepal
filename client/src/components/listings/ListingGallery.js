"use client";

import { useState } from "react";

export default function ListingGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) {
    return (
      <div className="h-96 rounded-xl bg-gray-100 flex items-center justify-center">
        No Image Available
      </div>
    );
  }

  return (
    <div>
      {/* Main Image */}
      <div className="overflow-hidden rounded-xl border">
        <img
          src={images[selectedImage].url}
          alt="Listing"
          className="h-96 w-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.public_id || index}
              onClick={() => setSelectedImage(index)}
              className={`overflow-hidden rounded-lg border-2 ${
                selectedImage === index
                  ? "border-violet-600"
                  : "border-transparent"
              }`}
            >
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="h-20 w-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}