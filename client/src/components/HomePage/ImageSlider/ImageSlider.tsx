import React, { useState, useEffect, useCallback, useRef } from "react";
import { SlideOverlay } from "./SlideOverlay";
import { SlideNavigation } from "./SlideNavigation";

// The Data should come from database or API
const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b",
    name: "Cambridge University",
    description:
      "A world-renowned institution with centuries of academic excellence and groundbreaking research.",
    location: "Cambridge, United Kingdom",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1562774053-701939374585",
    name: "Stanford University",
    description:
      "Leading innovation and entrepreneurship in the heart of Silicon Valley.",
    location: "Stanford, California",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1700989101224-c4d286d8279a",
    name: "University of Tokyo",
    description:
      "Japan's premier educational institution, blending tradition with cutting-edge research.",
    location: "Tokyo, Japan",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952",
    name: "ETH Zürich",
    description:
      "Excellence in science, technology, and innovation in the heart of Europe.",
    location: "Zürich, Switzerland",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd",
    name: "University of Cape Town",
    description:
      "Africa's leading research university, inspiring minds and transforming lives.",
    location: "Cape Town, South Africa",
  },
];

export function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const previousSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = window.setInterval(nextSlide, 4000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <img
              src={`${slide.image}?auto-format&fit=crop&w=1920&q=80`}
              alt={slide.name}
              className="w-full h-full object-cover"
            />
            <SlideOverlay
              name={slide.name}
              description={slide.description}
              location={slide.location}
              onLearnMore={() =>
                console.log(
                  `Learn more about ${slide.name} and put university or school website link here`
                )
              }
            />
          </div>
        ))}
      </div>
      <SlideNavigation
        totalSlides={slides.length}
        currentSlide={currentSlide}
        onPrevious={previousSlide}
        onNext={nextSlide}
        onDotClick={setCurrentSlide}
      />
    </div>
  );
}
