// import React from "react";

interface ImagePreviewProps {
  images: File[];
}

export function ImagePreview({ images }: ImagePreviewProps) {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-square">
          <img
            src={URL.createObjectURL(image)}
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
