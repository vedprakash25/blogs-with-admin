import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = createAdminClient();
  const { id } = await params; // ✅ must await it

  const { data: blog, error } = await supabase
    .from("blogs")
    .update({
      status: "draft",
      trashed_at: null,
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
