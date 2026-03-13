export type BlogStatus = 'draft' | 'scheduled' | 'published' | 'trashed'

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: Record<string, any> // Tiptap JSON
  cover_image: string | null
  category: Category
  category_id: string
  tags: Tag[]
  status: BlogStatus
  scheduled_at: string | null
  published_at: string | null
  trashed_at: string | null
  views: number
  likes: number
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

export interface BlogListItem {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image: string | null
  category: Category
  tags: Tag[]
  status: BlogStatus
  views: number
  likes: number
  published_at: string | null
  scheduled_at: string | null
  trashed_at: string | null
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  blog_id: string
  author_name: string
  author_email: string
  content: string
  created_at: string
}

export interface Subscriber {
  id: string
  email: string
  is_active: boolean
  subscribed_at: string
}

export interface Profile {
  id: string
  email: string
  role: string
  created_at: string
}

export interface DashboardStats {
  totalBlogs: number
  publishedBlogs: number
  draftBlogs: number
  scheduledBlogs: number
  totalViews: number
  totalLikes: number
  totalComments: number
  totalSubscribers: number
}

export interface TocItem {
  id: string
  text: string
  level: number
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}
