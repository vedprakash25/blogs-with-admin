import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/component/ui/button";

const Footer = () => {
  // const currentYear = new Date().getFullYear();

  return (
    <footer className=" font-inter">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-screen-xl mx-auto flex gap-10 flex-wrap justify-between">
          <div className="">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl">TechInsights</span>
              </div>
              <p className="text-muted-foreground">
                Empowering developers with cutting-edge <br />
                insights, tutorials, and industry expertise.
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                >
                  <Github className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex md:flex-row flex-col justify-between xl:gap-20 gap-10">
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#latest"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Latest Articles
                  </a>
                </li>
                <li>
                  <a
                    href="#tech-news"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Tech News
                  </a>
                </li>
                <li>
                  <a
                    href="#learn"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Learning Resources
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-6">Categories</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    React & JavaScript
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Node.js & Backend
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    AI & Machine Learning
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    DevOps & Cloud
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-6">Company</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-300 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center">
            © 2025 TechInsights. Crafted with love for developers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
