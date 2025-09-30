import BlogCard from "./blogCard";
import { Button } from "@/component/ui/button";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Understanding React 18 Concurrent Features",
    description:
      "Learn about the revolutionary concurrent features introduced in React 18 and how they can improve your app's user experience and performance.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop&crop=faces",
    author: "Sarah Chen",
    publishDate: "Dec 15, 2024",
    readTime: "8 min read",
    tags: ["React", "JavaScript", "Performance"],
  },
  {
    id: 2,
    title: "Building Microservices with Node.js",
    description:
      "A comprehensive guide to architecting and implementing microservices using Node.js, Docker, and modern deployment strategies.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&crop=faces",
    author: "Michael Rodriguez",
    publishDate: "Dec 12, 2024",
    readTime: "12 min read",
    tags: ["Node.js", "Microservices", "DevOps"],
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox: When to Use Each",
    description:
      "Master the differences between CSS Grid and Flexbox layouts. Learn when to use each approach for optimal web design and development.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=faces",
    author: "Emily Johnson",
    publishDate: "Dec 10, 2024",
    readTime: "6 min read",
    tags: ["CSS", "Layout", "Web Design"],
  },
  {
    id: 4,
    title: "GraphQL Best Practices for 2024",
    description:
      "Discover the latest best practices for implementing GraphQL in your applications, including schema design and performance optimization.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&crop=faces",
    author: "David Kim",
    publishDate: "Dec 8, 2024",
    readTime: "10 min read",
    tags: ["GraphQL", "API", "Backend"],
  },
  {
    id: 5,
    title: "TypeScript Advanced Patterns",
    description:
      "Explore advanced TypeScript patterns and techniques that will make your code more robust, maintainable, and type-safe.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&h=400&fit=crop&crop=faces",
    author: "Alex Thompson",
    publishDate: "Dec 5, 2024",
    readTime: "9 min read",
    tags: ["TypeScript", "JavaScript", "Patterns"],
  },
  {
    id: 6,
    title: "Web Performance Optimization Guide",
    description:
      "Complete guide to optimizing web performance including Core Web Vitals, image optimization, and modern loading strategies.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=faces",
    author: "Lisa Park",
    publishDate: "Dec 3, 2024",
    readTime: "15 min read",
    tags: ["Performance", "Web Vitals", "Optimization"],
  },
];

const LatestBlogs = () => {
  return (
    <section
      id="latest"
      className="py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Latest Articles
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay up to date with the latest trends, tutorials, and insights from
            the world of technology
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {blogPosts.slice(0, 6).map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              description={post.description}
              image={post.image}
              author={post.author}
              publishDate={post.publishDate}
              readTime={post.readTime}
              tags={post.tags}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="px-8"
          >
            Load More Articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
