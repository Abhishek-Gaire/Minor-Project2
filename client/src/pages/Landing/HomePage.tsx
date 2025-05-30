import Layout from "../../components/Layout.tsx";

import { Hero } from "../../components/HomePage/Hero.tsx";
import { Features } from "../../components/HomePage/Features/Features.tsx";
import { ImageSlider } from "../../components/HomePage/ImageSlider/ImageSlider.tsx";
import { useState,useEffect } from "react";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI!;

const HomePage = () => {
  const [slides,setSlides] = useState([])
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`${BACKEND_URI}/api/v1/schools`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json()
        setSlides(responseData.data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };
    fetchSlides();
  }, []);
  return (
    <Layout>
      <ImageSlider slides={slides}/>
      <Hero />
      <Features />
    </Layout>
  );
};

export default HomePage;
