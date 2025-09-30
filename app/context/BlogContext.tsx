"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Blog } from "@/types/blogTypes";
import { getBlogs } from "@/lib/blogApi";

interface BlogContextType {
  blogs: Blog[];
  loading: boolean;
  fetchBlogs: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider = ({ children }: BlogProviderProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // );

  const fetchBlogs = async () => {
    setLoading(true);
    // const { data, error } = await supabase.from<Blog>("blogs").select("*");

    const data = await getBlogs();
    if (data) {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, loading, fetchBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

// ✅ Custom hook to use context
export const useBlogs = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlogs must be used within a BlogProvider");
  return context;
};
