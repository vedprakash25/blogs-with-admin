export interface Blog {
  id: number; // unique blog ID
  title: string; // blog title
  content: string; // blog content or body
  category?: string; // optional category or tag
  author?: string; // optional author name
  created_at?: string | number; // timestamp of creation (ISO string)
  updated_at?: string | number; // timestamp of last update (ISO string)
  image_url?: string; // optional image URL for blog cover
}
