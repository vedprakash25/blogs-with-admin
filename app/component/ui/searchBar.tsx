"use client";
import { useState, useEffect } from "react";
import { searchPosts } from "@/lib/blogApi";

export default function SearchEngine() {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any>([]);
  const [results, setResults] = useState<any>([]);
  const [searched, setSearched] = useState<boolean>(false); // track if user searched

  // Fetch suggestions as user types
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const data = await searchPosts(query);
      setSuggestions(data!.slice(0, 5));
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSearch = async () => {
    setSearched(true);
    const data = await searchPosts(query);
    if (data) {
      setResults(data);
    } else {
      setResults([]);
    }
    setSuggestions([]);
  };

  function highlightText(text: string, query: string) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-yellow-200 dark:bg-yellow-600"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blog posts..."
        className="w-full border rounded-md px-4 py-2 focus:border-gray-500"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="border mt-1 rounded-md shadow bg-white">
          {suggestions.map((item: any) => (
            <li
              key={item.id}
              className="px-4 py-2 hover:text-blue-600 cursor-pointer"
              onClick={() => {
                setQuery(item.title);
                handleSearch();
              }}
            >
              {highlightText(item.title, query)}
            </li>
          ))}
        </ul>
      )}

      {/* Results */}
      <div className="mt-4">
        {results.length > 0 &&
          results.map((post: any) => (
            <div
              key={post.id}
              className="border-b py-2"
            >
              <h2 className="font-bold">{highlightText(post.title, query)}</h2>
              <p>{highlightText(post.content.slice(0, 150), query)}...</p>
            </div>
          ))}

        {/* No results message */}
        {searched && results.length === 0 && (
          <p className="text-gray-500 italic">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
}
