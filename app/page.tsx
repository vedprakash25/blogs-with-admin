import React from "react";
import Hero from "./home/01_hero";
import FeaturedCarousel from "./home/02_featuredCarousel";
import LatestBlogs from "./home/03_latestBlogs";
import TechNews from "./home/04_techNews";
import LearningSection from "./home/05_learningSection";


export default function Pages() {
  return (
    <div>
      <Hero />
      <FeaturedCarousel />
      <LatestBlogs />
      <TechNews />
      <LearningSection />
    </div>
  );
}
