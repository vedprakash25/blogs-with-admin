"use client";

import { useBlogs } from "@/context/BlogContext";

export default function BlogList() {
  const { blogs, loading } = useBlogs();

  if (loading) return <p>Loading...</p>;

  console.log(blogs);

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
}
