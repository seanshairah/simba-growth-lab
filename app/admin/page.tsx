"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowUpRight,
  LogOut,
  PenLine,
  Plus,
  Trash2,
  TriangleAlert,
} from "lucide-react"
import type { Article } from "@/lib/posts"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Article[] | null>(null)
  const [hasDb, setHasDb] = useState(true)
  const [error, setError] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)

  async function load() {
    const res = await fetch("/api/admin/posts")
    if (res.status === 401) {
      router.push("/admin/login")
      return
    }
    const data = await res.json().catch(() => ({}))
    setPosts(data.posts ?? [])
    setHasDb(Boolean(data.hasDatabase))
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleDelete(slug: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(slug)
    setError("")
    const res = await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || "Could not delete the post.")
    }
    setDeleting(null)
    load()
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-ink-foreground">
              SG
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Blog admin
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              View blog
              <ArrowUpRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              <LogOut className="size-4" />
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-px w-5 bg-accent" />
              Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-medium tracking-tight">
              Your <em className="font-serif italic text-accent">posts</em>
            </h1>
          </div>
          <Link
            href="/admin/posts/new"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ink-foreground transition-colors hover:bg-accent"
          >
            <Plus className="size-4" />
            New post
          </Link>
        </div>

        {!hasDb && posts !== null && (
          <p className="mt-6 flex items-start gap-2 rounded-xl bg-accent-soft px-4 py-3 text-sm text-accent">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" />
            No database connected — posts are read-only. Add the DATABASE_URL
            environment variable to this project in Vercel to create and edit
            posts.
          </p>
        )}

        {error && (
          <p className="mt-6 rounded-xl bg-accent-soft px-4 py-3 text-sm text-accent">
            {error}
          </p>
        )}

        <div className="mt-8 space-y-3">
          {posts === null && (
            <p className="text-sm text-muted-foreground">Loading posts…</p>
          )}
          {posts !== null && posts.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No posts yet — write your first one.
            </p>
          )}
          {posts?.map((post) => (
            <div
              key={post.slug}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-5 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{post.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {post.date} · {post.tag} · {post.readTime}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs transition-colors hover:border-accent hover:text-accent"
                >
                  View
                  <ArrowUpRight className="size-3.5" />
                </Link>
                <Link
                  href={`/admin/posts/${post.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs transition-colors hover:border-accent hover:text-accent"
                >
                  <PenLine className="size-3.5" />
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(post.slug, post.title)}
                  disabled={deleting === post.slug || !hasDb}
                  className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-red-400 hover:text-red-500 disabled:opacity-50"
                >
                  <Trash2 className="size-3.5" />
                  {deleting === post.slug ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
