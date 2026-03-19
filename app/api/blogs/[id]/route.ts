import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = createAdminClient();
  const { id } = await params;

  const { data, error } = await supabase
    .from("blogs")
    .select(
      `
      *,
      category:categories(id, name, slug),
      tags:blog_tags(tag:tags(id, name, slug))
    `,
    )
    .eq("id", id)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 404 });

  const blog = {
    ...data,
    tags: data.tags?.map((t: any) => t.tag).filter(Boolean) ?? [],
  };

  return NextResponse.json({ data: blog });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = createAdminClient();
  const { id } = await params;

  try {
    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      cover_image,
      category_id,
      status,
      scheduled_at,
      meta_title,
      meta_description,
      tags,
    } = body;

    const updateData: any = {
      title,
      excerpt,
      content,
      cover_image,
      category_id,
      status,
      meta_title,
      meta_description,
      updated_at: new Date().toISOString(),
    };

    if (status === "scheduled" && scheduled_at) {
      updateData.scheduled_at = scheduled_at;
      updateData.published_at = null;
    }
    if (status === "published") {
      updateData.published_at = new Date().toISOString();
      updateData.scheduled_at = null;
    }
    if (status === "draft") {
      updateData.scheduled_at = null;
      updateData.published_at = null;
    }

    const { data: blog, error } = await supabase
      .from("blogs")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    // Sync tags: delete old, insert new
    await supabase.from("blog_tags").delete().eq("blog_id", id);
    if (tags && tags.length > 0) {
      const tagRows = tags.map((tag_id: string) => ({
        blog_id: id,
        tag_id,
      }));
      await supabase.from("blog_tags").insert(tagRows);
    }

    revalidatePath("/");
    revalidatePath(`/blog/${blog.slug}`);

    return NextResponse.json({ data: blog });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = createAdminClient();
  const { id } = await params;

  // Soft delete — move to trash
  const { data: blog, error } = await supabase
    .from("blogs")
    .update({
      status: "trashed",
      trashed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("slug")
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath(`/blog/${blog.slug}`);

  return NextResponse.json({ data: { success: true } });
}
