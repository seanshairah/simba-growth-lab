import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAdminRequest } from "@/lib/admin-auth"
import { getPostBySlug, deletePost, hasDatabase } from "@/lib/blog-data"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 })
  }
  return NextResponse.json({ post })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "No database connected. Add DATABASE_URL in Vercel first." },
      { status: 503 }
    )
  }
  const { slug } = await params
  await deletePost(slug)
  revalidatePath("/")
  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)
  return NextResponse.json({ ok: true })
}
