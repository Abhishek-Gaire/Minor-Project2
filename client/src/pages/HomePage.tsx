// import React from "react";

import { Navbar } from "../components/HomePage/Navbar.tsx";
import { Hero } from "../components/HomePage/Hero.tsx";
import { Features } from "../components/HomePage/Features.tsx";
import { Footer } from "../components/HomePage/Footer.tsx";
import { ImageSlider } from "../components/HomePage/ImageSlider/ImageSlider.tsx";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ImageSlider />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
