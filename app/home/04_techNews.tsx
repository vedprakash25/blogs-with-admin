import { Badge } from "@/component/ui/badge";
import { Card } from "@/component/ui/card";
import { ExternalLink, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/component/ui/button";
import Image from "next/image";

const newsItems = [
  {
    id: 1,
    headline:
      "OpenAI Releases GPT-5: Revolutionary AI Model with Enhanced Reasoning",
    summary:
      "The latest iteration of GPT brings unprecedented capabilities in logical reasoning and multimodal understanding.",
    tag: "AI",
    timeAgo: "2 hours ago",
    trending: true,
    source: "TechCrunch",
  },
  {
    id: 2,
    headline: "React 19 Beta Released with Major Performance Improvements",
    summary:
      "New compiler optimizations and automatic memoization make React apps significantly faster.",
    tag: "React",
    timeAgo: "5 hours ago",
    trending: true,
    source: "React Blog",
  },
  {
    id: 3,
    headline: "Vercel Announces Edge Runtime Support for Python Applications",
    summary:
      "Developers can now deploy Python functions at the edge for improved global performance.",
    tag: "Serverless",
    timeAgo: "8 hours ago",
    trending: false,
    source: "Vercel",
  },
  {
    id: 4,
    headline: "GitHub Copilot Workspace: AI-Powered Development Environment",
    summary:
      "New integrated development environment with AI assistance for entire project workflows.",
    tag: "DevTools",
    timeAgo: "12 hours ago",
    trending: true,
    source: "GitHub Blog",
  },
  {
    id: 5,
    headline: "Web Components Gain Native Support in All Major Browsers",
    summary:
      "Universal browser support marks a milestone for framework-agnostic component development.",
    tag: "Web Standards",
    timeAgo: "1 day ago",
    trending: false,
    source: "MDN Web Docs",
  },
  {
    id: 6,
    headline: "Deno 2.0 Introduces Built-in Package Manager and JSX Support",
    summary:
      "Major update brings npm compatibility and enhanced developer experience.",
    tag: "Runtime",
    timeAgo: "2 days ago",
    trending: false,
    source: "Deno Blog",
  },
];

const TechNews = () => {
  return (
    <section
      id="tech-news"
      className="py-16 bg-slate-100 dark:bg-black"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tech News</h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Stay informed with the latest breaking news and <br /> updates from
            the tech industry
          </p>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 lg:grid-cols-2 overflow-hidden">
          {/* Featured News Item */}
          <Card className="lg:row-span-2 md:p-6 p-4 hover-lift md:h-[600px] border-slate-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-accent text-accent-foreground">
                  {newsItems[0].tag}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {newsItems[0].timeAgo}
                </div>
              </div>

              {newsItems[0].trending && (
                <div className="flex items-center text-accent font-medium text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Trending
                </div>
              )}

              <Image
                className="w-full h-[250px] rounded-xl"
                alt="trending "
                src="/hero.jpg"
                height={500}
                width={500}
              />

              <h3 className="text-2xl font-bold leading-tight hover:text-primary transition-colors cursor-pointer">
                {newsItems[0].headline}
              </h3>

              <p className="text-muted-foreground text-xl leading-relaxed">
                {newsItems[0].summary}
              </p>

              <div className="flex items-center justify-between pt-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Source: {newsItems[0].source}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary-hover"
                >
                  Read More
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Regular News Items */}
          <div className="relative">
            <div className="space-y-6 md:px-4 md:max-h-[640px] overflow-y-scroll">
              {newsItems.slice(1).map((item) => (
                <Card
                  key={item.id}
                  className="p-4 hover-lift cursor-pointer group border-slate-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        {item.tag}
                      </Badge>
                      {item.trending && (
                        <div className="flex items-center text-accent font-medium text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </div>
                      )}
                    </div>

                    <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                      {item.headline}
                    </h4>

                    {/* <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.summary}
                  </p> */}

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.source}</span>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.timeAgo}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="absolute h-24 w-full bg-gradient-to-b from-transparent to-slate-100 dark:to-black bottom-0 right-0 left-0"></div>
            </div>
          </div>
        </div>

        {/* View All News Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="px-8"
          >
            View All Tech News
            <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TechNews;
