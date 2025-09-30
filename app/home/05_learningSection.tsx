import { Card } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";
import { Button } from "@/component/ui/button";
import { BookOpen, Play, Download, Star, Users, ArrowRight } from "lucide-react";

const learningResources = [
  {
    id: 1,
    title: "Complete React Developer Course",
    description: "Master React from basics to advanced concepts including hooks, context, and performance optimization.",
    type: "Course",
    duration: "40 hours",
    level: "Intermediate",
    rating: 4.9,
    students: 15420,
    icon: <Play className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&crop=faces"
  },
  {
    id: 2,
    title: "Node.js API Development Guide",
    description: "Build scalable REST APIs with Node.js, Express, and MongoDB. Includes authentication and deployment.",
    type: "Tutorial Series",
    duration: "25 hours",
    level: "Advanced",
    rating: 4.8,
    students: 8930,
    icon: <BookOpen className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&crop=faces"
  },
  {
    id: 3,
    title: "TypeScript Fundamentals",
    description: "Learn TypeScript from scratch and understand how to write type-safe JavaScript applications.",
    type: "Free Course",
    duration: "15 hours",
    level: "Beginner",
    rating: 4.7,
    students: 22150,
    icon: <Download className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=250&fit=crop&crop=faces"
  },
  {
    id: 4,
    title: "Modern CSS Layouts",
    description: "Master CSS Grid, Flexbox, and modern layout techniques for responsive web design.",
    type: "Workshop",
    duration: "12 hours",
    level: "Intermediate",
    rating: 4.9,
    students: 11250,
    icon: <Play className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=faces"
  },
  {
    id: 5,
    title: "DevOps for Developers",
    description: "Learn Docker, Kubernetes, CI/CD pipelines, and cloud deployment strategies.",
    type: "Bootcamp",
    duration: "60 hours",
    level: "Advanced",
    rating: 4.8,
    students: 7890,
    icon: <BookOpen className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=250&fit=crop&crop=faces"
  },
  {
    id: 6,
    title: "JavaScript ES2024 Features",
    description: "Explore the latest JavaScript features and learn how to use them in modern web development.",
    type: "Free Guide",
    duration: "8 hours",
    level: "Intermediate",
    rating: 4.6,
    students: 18750,
    icon: <Download className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop&crop=faces"
  }
];

const LearningSection = () => {
  return (
    <section id="learn" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Things to Learn</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Curated learning resources to help you master modern web development technologies and advance your career
          </p>
        </div>

        {/* Learning Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {learningResources.map((resource) => (
            <Card key={resource.id} className="blog-card group overflow-hidden">
              {/* Resource Image */}
              <div className="relative overflow-hidden">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-primary-foreground">
                    {resource.type}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {resource.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title and Level */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors flex-1">
                    {resource.title}
                  </h3>
                  <div className="ml-2">
                    {resource.icon}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {resource.description}
                </p>

                {/* Meta Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="outline" className="text-xs">
                      {resource.level}
                    </Badge>
                    <div className="flex items-center text-muted-foreground">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{resource.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{resource.students.toLocaleString()} students</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button className="w-full group-hover:shadow-md transition-shadow">
                  Start Learning
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Browse All Resources Button */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="px-8">
            Browse All Resources
            <BookOpen className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LearningSection;