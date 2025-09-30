import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Card } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";
import { Button } from "@/component/ui/button";
import Image from "next/image";

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  author: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const BlogCard = ({
  title,
  description,
  image,
  author,
  publishDate,
  readTime,
  tags,
  featured = false,
}: BlogCardProps) => {
  return (
    <Card
      className={`blog-card bg-slate-200 border-gray-200 rounded-xl overflow-hidden group cursor-pointer ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          width={800}
          height={800}
          src={image}
          alt={title}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            featured ? "h-64 sm:h-80" : "h-48"
          }`}
        />
        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-accent text-accent-foreground">Featured</Badge>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3
          className={`font-bold mb-3 leading-tight group-hover:text-primary transition-colors ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{publishDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>

        {/* Read More Button */}
        <Button
          variant="ghost"
          className="p-0 h-auto font-semibold text-primary hover:text-primary-hover group"
        >
          Read More
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
};

export default BlogCard;
