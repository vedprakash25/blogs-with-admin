import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/component/ui/button";
import Image from "next/image";
import heroImage from "@/public/hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] py-14 flex items-center justify-center overflow-hidden ">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Modern technology background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 backdrop-blur-sm bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex  items-center px-4 py-2 rounded-full font-inter bg-primary/10 text-primary text-sm font-medium mb-8 animate-slide-up">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
            New articles every week
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-inter font-bold mb-6 leading-tight text-white">
            Discover the{" "}
            <span className="text-hero-gradient">Future of Technology</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-white/70 font-light mb-8 max-w-3xl mx-auto leading-relaxed">
            Expert insights, in-depth tutorials, and the latest trends in web
            development, AI, and modern software engineering. Join thousands of
            developers staying ahead of the curve.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform"
            >
              Explore Articles
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Introduction
            </Button>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Articles Published</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">20+</div>
              <div className="text-muted-foreground">Expert Authors</div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
