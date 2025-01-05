import React from "react";
import { MapPin } from "lucide-react";

interface SlideOverlayProps {
  name: string;
  description: string;
  location: string;
  onLearnMore: () => void;
}

export function SlideOverlay({
  name,
  description,
  location,
  onLearnMore,
}: SlideOverlayProps) {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center">
      <div className="text-white text-center max-w-3xl px-6 animate-fade-in">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {name}
        </h2>
        <p className="text-lg md:text-xl mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-center text-sm md:text-base mb-6">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{location}</span>
        </div>
        <button
          onClick={onLearnMore}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
