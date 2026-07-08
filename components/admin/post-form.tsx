"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export type PostFormValues = {
  slug?: string
  title: string
  excerpt: string
  tag: string
  date: string
  readTime: string
  content: string
}

const empty: PostFormValues = {
  title: "",
  excerpt: "",
  tag: "Notes",
  date: "",
  readTime: "",
  content: "",
}

export function PostForm({
  initial,
  mode,
}: {
  initial?: PostFormValues
  mode: "new" | "edit"
}) {
  const router = useRouter()
  const [values, setValues] = useState<PostFormValues>(initial ?? empty)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  function set<K extends keyof PostFormValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok) {
      router.push("/admin")
      router.refresh()
    } else {
      setError(data.error || "Could not save the post.")
      setSaving(false)
    }
  }

  const inputCls =
    "mt-2 w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
  const labelCls = "text-xs uppercase tracking-wide text-muted-foreground"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Dashboard
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ink-foreground transition-colors hover:bg-accent disabled:opacity-60"
        >
          <Save className="size-4" />
          {saving ? "Saving…" : mode === "new" ? "Publish post" : "Save changes"}
        </button>
      </div>

      {error && (
        <p className="rounded-xl bg-accent-soft px-4 py-2.5 text-sm text-accent">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="title" className={labelCls}>
          Title
        </label>
        <input
          id="title"
          value={values.title}
          onChange={(e) => set("title", e.target.value)}
          required
          className={inputCls}
          placeholder="A headline that makes people click"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className={labelCls}>
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={values.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          rows={2}
          className={inputCls}
          placeholder="One or two sentences shown on the blog cards"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="tag" className={labelCls}>
            Tag
          </label>
          <input
            id="tag"
            value={values.tag}
            onChange={(e) => set("tag", e.target.value)}
            className={inputCls}
            placeholder="Analytics"
          />
        </div>
        <div>
          <label htmlFor="date" className={labelCls}>
            Date
          </label>
          <input
            id="date"
            type="date"
            value={values.date}
            onChange={(e) => set("date", e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="readTime" className={labelCls}>
            Read time (optional)
          </label>
          <input
            id="readTime"
            value={values.readTime}
            onChange={(e) => set("readTime", e.target.value)}
            className={inputCls}
            placeholder="Auto-estimated if empty"
          />
        </div>
      </div>

      <div>
        <label htmlFor="content" className={labelCls}>
          Content
        </label>
        <p className="mt-1 text-xs text-muted-foreground">
          Separate paragraphs with a blank line. Start a line with{" "}
          <code className="rounded bg-accent-soft px-1 text-accent">## </code>{" "}
          for a heading and{" "}
          <code className="rounded bg-accent-soft px-1 text-accent">&gt; </code>{" "}
          for a pull-quote.
        </p>
        <textarea
          id="content"
          value={values.content}
          onChange={(e) => set("content", e.target.value)}
          rows={18}
          required
          className={`${inputCls} font-mono text-[13px] leading-relaxed`}
          placeholder={"The opening paragraph…\n\n## A section heading\n\nMore thoughts…\n\n> A quote worth pulling out."}
        />
      </div>
    </form>
  )
}
