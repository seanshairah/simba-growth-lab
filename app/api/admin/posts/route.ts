import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAdminRequest } from "@/lib/admin-auth"
import {
  getAllPosts,
  upsertPost,
  seedIfEmpty,
  hasDatabase,
  artForSlug,
} from "@/lib/blog-data"
import { textToBlocks, slugify, estimateReadTime } from "@/lib/blocks"
import type { Post } from "@/lib/posts"

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  await seedIfEmpty()
  const posts = await getAllPosts()
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
          "No database connected. Add the DATABASE_URL environment variable (Neon integration) in Vercel to save posts.",
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

  const blocks = textToBlocks(String(body.content))
  const slug = body.slug ? slugify(String(body.slug)) : slugify(String(body.title))
  if (!slug) {
    return NextResponse.json({ error: "Could not derive a slug." }, { status: 400 })
  }

  const post: Post = {
    slug,
    title: String(body.title).trim(),
    excerpt: String(body.excerpt || "").trim(),
    tag: String(body.tag || "Notes").trim() || "Notes",
    readTime: String(body.readTime || "").trim() || estimateReadTime(blocks),
    date: String(body.date || "").trim() || new Date().toISOString().slice(0, 10),
    art: String(body.art || "").trim() || artForSlug(slug),
    content: blocks,
  }

  await seedIfEmpty()
  await upsertPost(post)
  revalidatePath("/")
  revalidatePath("/blog")
  revalidatePath(`/blog/${post.slug}`)
  return NextResponse.json({ ok: true, slug: post.slug })
}
