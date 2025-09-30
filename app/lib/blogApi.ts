import { supabase } from "./supabaseClient";

// fetch all blogs
export async function getBlogs() {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

// fetch blog by slug
export async function getBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}

// add new blog
export async function addBlog(blog: {
  title: string;
  slug: string;
  content: string;
  author: string;
}) {
  const { data, error } = await supabase.from("blogs").insert([blog]);
  if (error) throw error;
  return data;
}

// update blog
export async function updateBlog(slug: string, updatedData: any) {
  const { data, error } = await supabase
    .from("blogs")
    .update(updatedData)
    .eq("slug", slug);
  if (error) throw error;
  return data;
}

// delete blog
export async function deleteBlog(slug: string) {
  const { data, error } = await supabase
    .from("blogs")
    .delete()
    .eq("slug", slug);
  if (error) throw error;
  return data;
}

//search blog
export async function searchPosts(query: string) {
  if (!query) return [];

  const { data, error } = await supabase
    .from("blogs")
    .select("id, title, content")
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`); // partial match

  if (error) console.error(error);
  return data;
}
