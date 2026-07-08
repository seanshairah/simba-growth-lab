import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAdminRequest } from "@/lib/admin-auth"
import {
  getAllPostsForAdmin,
  upsertPost,
  hasDatabase,
} from "@/lib/blog-data"
import { slugify, excerptFromHtml } from "@/lib/posts"

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const posts = await getAllPostsForAdmin()
  return NextResponse.json({ posts, hasDatabase: hasDatabase() })
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!hasDatabase()) {
    return NextResponse.json(
      {
        error:
          "No database connected. Add the DATABASE_URL environment variable in Vercel to save posts.",
      },
      { status: 503 }
    )
  }

  const body = await request.json().catch(() => null)
  if (!body?.title || !body?.content) {
    return NextResponse.json(
      { error: "Title and content are required." },
      { status: 400 }
    )
  }

  const slug = slugify(String(body.slug || body.title))
  if (!slug) {
    return NextResponse.json({ error: "Could not derive a slug." }, { status: 400 })
  }

  const content = String(body.content)
  await upsertPost({
    slug,
    originalSlug: body.originalSlug ? String(body.originalSlug) : undefined,
    title: String(body.title).trim(),
    excerpt: String(body.excerpt || "").trim() || excerptFromHtml(content),
    content,
    category: String(body.category || "").trim(),
    coverImage: String(body.coverImage || "").trim() || null,
    date: String(body.date || "").trim() || new Date().toISOString().slice(0, 10),
    status: body.status === "DRAFT" ? "DRAFT" : "PUBLISHED",
  })

  revalidatePath("/")
  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)
  return NextResponse.json({ ok: true, slug })
}
