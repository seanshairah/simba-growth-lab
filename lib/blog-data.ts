import "server-only"
import { neon } from "@neondatabase/serverless"
import {
  type Article,
  fallbackArticles,
  tagFromCategory,
  readTimeFromHtml,
  excerptFromHtml,
} from "@/lib/posts"

function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) return null
  try {
    return neon(url)
  } catch {
    return null
  }
}

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL)
}

type Row = {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  category: string | null
  cover_image_url: string | null
  status: string
  published_at: string | null
  created_at: string | null
}

function toDateString(value: string | null): string {
  if (!value) return new Date().toISOString().slice(0, 10)
  return String(value).slice(0, 10)
}

function rowToArticle(row: Row): Article {
  const html = row.content || ""
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: (row.excerpt && row.excerpt.trim()) || excerptFromHtml(html),
    html,
    category: row.category || "",
    tag: tagFromCategory(row.category || ""),
    coverImage: row.cover_image_url || null,
    date: toDateString(row.published_at || row.created_at),
    readTime: readTimeFromHtml(html),
  }
}

/** All published articles, newest first. Falls back to static content. */
export async function getAllPosts(): Promise<Article[]> {
  const sql = getSql()
  if (sql) {
    try {
      const rows = (await sql`
        SELECT id, title, slug, excerpt, content, category, cover_image_url,
               status, published_at, created_at
        FROM posts
        WHERE status = 'PUBLISHED'
        ORDER BY published_at DESC NULLS LAST, created_at DESC
      `) as Row[]
      if (rows.length > 0) return rows.map(rowToArticle)
    } catch {
      // fall through to fallback content
    }
  }
  return fallbackArticles
}

export async function getPostBySlug(slug: string): Promise<Article | undefined> {
  const sql = getSql()
  if (sql) {
    try {
      const rows = (await sql`
        SELECT id, title, slug, excerpt, content, category, cover_image_url,
               status, published_at, created_at
        FROM posts
        WHERE slug = ${slug}
        LIMIT 1
      `) as Row[]
      if (rows.length > 0) return rowToArticle(rows[0])
      return undefined
    } catch {
      // fall through to fallback content
    }
  }
  return fallbackArticles.find((a) => a.slug === slug)
}

/** All articles for the admin dashboard (any status). */
export async function getAllPostsForAdmin(): Promise<Article[]> {
  const sql = getSql()
  if (!sql) return fallbackArticles
  try {
    const rows = (await sql`
      SELECT id, title, slug, excerpt, content, category, cover_image_url,
             status, published_at, created_at
      FROM posts
      ORDER BY published_at DESC NULLS LAST, created_at DESC
    `) as Row[]
    return rows.map(rowToArticle)
  } catch {
    return fallbackArticles
  }
}

const AUTHOR_ID = 2 // Simbarashe Mukondo

export type UpsertInput = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  coverImage: string | null
  date: string
  status: string
  originalSlug?: string
}

export async function upsertPost(input: UpsertInput): Promise<void> {
  const sql = getSql()
  if (!sql) throw new Error("DATABASE_URL is not configured")
  const publishedAt = `${input.date}T12:00:00Z`
  const targetSlug = input.originalSlug || input.slug

  const existing = (await sql`SELECT id FROM posts WHERE slug = ${targetSlug} LIMIT 1`) as {
    id: number
  }[]

  if (existing.length > 0) {
    await sql`
      UPDATE posts SET
        title = ${input.title},
        slug = ${input.slug},
        excerpt = ${input.excerpt},
        content = ${input.content},
        category = ${input.category},
        cover_image_url = ${input.coverImage},
        status = ${input.status},
        published_at = ${publishedAt},
        updated_at = now()
      WHERE id = ${existing[0].id}
    `
  } else {
    await sql`
      INSERT INTO posts
        (title, slug, excerpt, content, category, cover_image_url, status,
         published_at, author_id, created_at, updated_at)
      VALUES
        (${input.title}, ${input.slug}, ${input.excerpt}, ${input.content},
         ${input.category}, ${input.coverImage}, ${input.status},
         ${publishedAt}, ${AUTHOR_ID}, now(), now())
    `
  }
}

export async function deletePost(slug: string): Promise<void> {
  const sql = getSql()
  if (!sql) throw new Error("DATABASE_URL is not configured")
  await sql`DELETE FROM posts WHERE slug = ${slug}`
}
