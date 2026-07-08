// Shared article type + a small set of static fallback articles used only when
// no database is configured. The real content lives in the Neon `posts` table
// (see lib/blog-data.ts).

export type Article = {
  id?: number
  slug: string
  title: string
  excerpt: string
  html: string
  category: string
  tag: string
  coverImage: string | null
  date: string // YYYY-MM-DD
  readTime: string
}

const GRADIENTS = [
  "linear-gradient(135deg, #e2590c 0%, #f5a45b 55%, #f1f0ec 100%)",
  "linear-gradient(135deg, #161616 0%, #4a4a45 60%, #e2590c 100%)",
  "linear-gradient(135deg, #f5a45b 0%, #e2590c 45%, #161616 100%)",
]

/** Deterministic gradient for cards without a cover image. */
export function gradientForSlug(slug: string): string {
  let h = 0
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) | 0
  return GRADIENTS[Math.abs(h) % GRADIENTS.length]
}

/** First category, tidied into a short display tag. */
export function tagFromCategory(category: string): string {
  const first = (category || "").split(",")[0]?.trim() || "Notes"
  return first
    .split(/\s+/)
    .map((w) => (w.length > 3 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ")
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 90)
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim()
}

export function readTimeFromHtml(html: string): string {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

export function excerptFromHtml(html: string, max = 180): string {
  const text = stripHtml(html)
  if (text.length <= max) return text
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`
}

export function formatDate(date: string) {
  const d = new Date(date.length <= 10 ? `${date}T00:00:00` : date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

// Fallback content shown only when the database is unreachable.
export const fallbackArticles: Article[] = [
  {
    slug: "welcome",
    title: "Welcome to the Simba Growth Lab journal",
    excerpt:
      "Notes from inside the data — on analytics, funnels and social media performance.",
    html: "<p>New articles are on the way. Check back soon.</p>",
    category: "Notes",
    tag: "Notes",
    coverImage: null,
    date: "2026-01-01",
    readTime: "1 min read",
  },
]
