"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/component/ui/button";
import { Card } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";

interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string;
}

const featuredSlides: CarouselSlide[] = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    description:
      "Explore how artificial intelligence is revolutionizing the way we build web applications, from automated testing to intelligent code generation.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=faces",
    tag: "AI & ML",
  },
  {
    id: 2,
    title: "Mastering React Server Components",
    description:
      "Deep dive into React Server Components and learn how they're changing the landscape of React development with improved performance.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop&crop=faces",
    tag: "React",
  },
  {
    id: 3,
    title: "Building Scalable APIs with Node.js",
    description:
      "Learn advanced techniques for creating robust, scalable REST APIs using Node.js, Express, and modern architectural patterns.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop&crop=faces",
    tag: "Backend",
  },
];

const FeaturedCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredSlides.length) % featuredSlides.length
    );
  };

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured Articles
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Discover our most popular and trending articles <br /> handpicked by
            our editorial team
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto ">
          <div className="overflow-hidden rounded-2xl md:rounded-3xl shadow-custom-lg">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredSlides.map((slide) => (
                <div
                  key={slide.id}
                  className="w-full flex-shrink-0"
                >
                  <Card className="relative h-96 lg:h-[500px] overflow-hidden border-0">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center">
                      <div className="container mx-auto px-8 lg:px-16">
                        <div className="max-w-2xl">
                          <Badge className="mb-4 bg-accent text-accent-foreground">
                            {slide.tag}
                          </Badge>
                          <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                            {slide.title}
                          </h3>
                          <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                            {slide.description}
                          </p>
                          <Button
                            size="lg"
                            className="bg-white text-black hover:bg-gray-100"
                          >
                            Read Full Article
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute bottom-0 right-0 flex gap-5">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer rounded-full dark:text-white bg-black/90 hover:bg-white border shadow-custom-md text-white hover:text-black h-10 w-10"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer rounded-full dark:text-white bg-black/90 hover:bg-white border shadow-custom-md text-white hover:text-black h-10 w-10"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-start py-3 mt-4 space-x-2">
            {featuredSlides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-black dark:bg-white scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
