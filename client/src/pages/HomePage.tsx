import React from "react";

import { Navbar } from "../components/HomePage/Navbar.tsx";
// import { Hero } from "../components/HomePage/Hero.tsx";
// import { Features } from "../components/HomePage/Features.tsx";
import { Footer } from "../components/HomePage/Footer.tsx";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* <Hero /> */}
      {/* <Features /> */}
      <Footer />
    </div>
  );
}
