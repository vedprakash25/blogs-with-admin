"use client";

import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/component/ui/button";
import { cn } from "@/lib/utils";
import SearchEngine from "./ui/searchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const { theme, setTheme } = useTheme();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Latest", href: "#latest" },
    { name: "Tech News", href: "#tech-news" },
    { name: "Learn", href: "#learn" },
    { name: "About", href: "#about" },
  ];

  return (
    <header className="sticky font-inter top-0 z-50 w-full bg-white backdrop-blur supports-[backdrop-filter]:bg-slate-200/60 dark:bg-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">TechInsights</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-800 dark:hover:text-slate-200 hover:text-black dark:text-slate-400 transition-colors duration-200 font-normal"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Search and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Theme toggle (commented for now) */}
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-4 space-y-4 border-t">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center space-x-4 pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Popup */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[99] flex items-start justify-center h-screen">
          <div className="absolute inset-0 blur-2xl h-full w-full bg-black/50"></div>
          <div className="relative w-full max-w-2xl mt-32 bg-white dark:bg-neutral-900 rounded-lg shadow-lg px-6 pt-14 pb-10 mx-4">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <SearchEngine />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
