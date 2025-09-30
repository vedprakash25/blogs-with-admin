import { getBlogBySlug } from "@/lib/blogApi";
import { Blog } from "@/types/blogTypes";
import ReactMarkdown from "react-markdown";

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  let blog: Blog | null = null;
  try {
    blog = await getBlogBySlug(slug);
  } catch (error) {
    console.log(error);
  }

  if (!blog) {
    return (
      <p className="text-center text-red-500 mt-10">
        Blog not found for slug: &quot;{slug}&quot;
      </p>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-6 prose prose-lg dark:prose-invert">
      <h1 className="font-bold text-3xl mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {blog.author ?? "Anonymous"} ·{" "}
        {blog.created_at && new Date(blog.created_at).toLocaleDateString()}
      </p>

      <ReactMarkdown>{blog.content}</ReactMarkdown>
    </article>
  );
}
