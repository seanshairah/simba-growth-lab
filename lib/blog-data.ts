import "server-only"
import { neon } from "@neondatabase/serverless"
import { posts as staticPosts, type Post, type PostBlock } from "@/lib/posts"

const ARTS = [
  "linear-gradient(135deg, #e2590c 0%, #f5a45b 55%, #f1f0ec 100%)",
  "linear-gradient(135deg, #161616 0%, #4a4a45 60%, #e2590c 100%)",
  "linear-gradient(135deg, #f5a45b 0%, #e2590c 45%, #161616 100%)",
]

export function artForSlug(slug: string): string {
  let h = 0
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) | 0
  return ARTS[Math.abs(h) % ARTS.length]
}

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

async function ensureTable(sql: NonNullable<ReturnType<typeof getSql>>) {
  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      tag TEXT NOT NULL DEFAULT 'Notes',
      read_time TEXT NOT NULL DEFAULT '3 min read',
      date TEXT NOT NULL,
      art TEXT NOT NULL DEFAULT '',
      content JSONB NOT NULL DEFAULT '[]',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
}

type Row = {
  slug: string
  title: string
  excerpt: string
  tag: string
  read_time: string
  date: string
  art: string
  content: PostBlock[]
}

function rowToPost(row: Row): Post {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    tag: row.tag,
    readTime: row.read_time,
    date: row.date,
    art: row.art || artForSlug(row.slug),
    content: row.content,
  }
}

/** Seed the table with the starter posts if it is empty. */
export async function seedIfEmpty(): Promise<void> {
  const sql = getSql()
  if (!sql) return
  await ensureTable(sql)
  const [{ count }] = (await sql`SELECT count(*)::int AS count FROM blog_posts`) as {
    count: number
  }[]
  if (count > 0) return
  for (const p of staticPosts) {
    await sql`
      INSERT INTO blog_posts (slug, title, excerpt, tag, read_time, date, art, content)
      VALUES (${p.slug}, ${p.title}, ${p.excerpt}, ${p.tag}, ${p.readTime}, ${p.date}, ${p.art}, ${JSON.stringify(p.content)}::jsonb)
      ON CONFLICT (slug) DO NOTHING
    `
  }
}

/** All posts: database when available and non-empty, otherwise the static starters. */
export async function getAllPosts(): Promise<Post[]> {
  const sql = getSql()
  if (sql) {
    try {
      await ensureTable(sql)
      const rows = (await sql`
        SELECT slug, title, excerpt, tag, read_time, date, art, content
        FROM blog_posts ORDER BY date DESC
      `) as Row[]
      if (rows.length > 0) return rows.map(rowToPost)
    } catch {
      // fall through to static content
    }
  }
  return staticPosts
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const sql = getSql()
  if (sql) {
    try {
      await ensureTable(sql)
      const rows = (await sql`
        SELECT slug, title, excerpt, tag, read_time, date, art, content
        FROM blog_posts WHERE slug = ${slug} LIMIT 1
      `) as Row[]
      if (rows.length > 0) return rowToPost(rows[0])
      const [{ count }] = (await sql`SELECT count(*)::int AS count FROM blog_posts`) as {
        count: number
      }[]
      if (count > 0) return undefined
    } catch {
      // fall through to static content
    }
  }
  return staticPosts.find((p) => p.slug === slug)
}

export async function upsertPost(post: Post): Promise<void> {
  const sql = getSql()
  if (!sql) throw new Error("DATABASE_URL is not configured")
  await ensureTable(sql)
  await sql`
    INSERT INTO blog_posts (slug, title, excerpt, tag, read_time, date, art, content, updated_at)
    VALUES (${post.slug}, ${post.title}, ${post.excerpt}, ${post.tag}, ${post.readTime}, ${post.date}, ${post.art}, ${JSON.stringify(post.content)}::jsonb, now())
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      tag = EXCLUDED.tag,
      read_time = EXCLUDED.read_time,
      date = EXCLUDED.date,
      art = EXCLUDED.art,
      content = EXCLUDED.content,
      updated_at = now()
  `
}

export async function deletePost(slug: string): Promise<void> {
  const sql = getSql()
  if (!sql) throw new Error("DATABASE_URL is not configured")
  await ensureTable(sql)
  await sql`DELETE FROM blog_posts WHERE slug = ${slug}`
}
