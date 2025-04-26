import React, { useState, useEffect, useCallback, useRef } from "react";
import { SlideOverlay } from "./SlideOverlay";
import { SlideNavigation } from "./SlideNavigation";
import { useNavigate } from "react-router-dom";

export function ImageSlider({slides}: {slides: {schoolName: string, description: string, schoolAddress: string, imageUrl: string, id: string}[]}) {
  const navigate = useNavigate();
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
      intervalRef.current = window.setInterval(nextSlide, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative h-[600px] overflow-hidden "
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
              src={`${slide.imageUrl}?auto-format&fit=crop&w=1920&q=80`}
              alt={slide.schoolName}
              className="w-full h-full object-cover"
            />
            <SlideOverlay
              name={slide.schoolName}
              description={slide.description}
              location={slide.schoolAddress}
              onLearnMore={() => navigate(`/school/${slide.id}`)}
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
