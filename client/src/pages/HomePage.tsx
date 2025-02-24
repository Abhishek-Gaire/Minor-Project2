import Layout from "../components/Layout.tsx";


import { Hero } from "../components/HomePage/Hero.tsx";
import { Features } from "../components/HomePage/Features/Features.tsx";
import { ImageSlider } from "../components/HomePage/ImageSlider/ImageSlider.tsx";

const HomePage =() => {
  return (
      <Layout>
          <ImageSlider/>
          <Hero/>
          <Features/>
      </Layout>
  );
}

export default HomePage;