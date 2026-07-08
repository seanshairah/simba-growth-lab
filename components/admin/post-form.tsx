"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export type PostFormValues = {
  originalSlug?: string
  slug?: string
  title: string
  excerpt: string
  category: string
  coverImage: string
  date: string
  status: string
  content: string
}

const empty: PostFormValues = {
  title: "",
  excerpt: "",
  category: "",
  coverImage: "",
  date: "",
  status: "PUBLISHED",
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
          placeholder="Shown on the blog cards. Left blank, it's taken from the content."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelCls}>
            Categories (comma separated)
          </label>
          <input
            id="category"
            value={values.category}
            onChange={(e) => set("category", e.target.value)}
            className={inputCls}
            placeholder="Marketing, Strategy"
          />
        </div>
        <div>
          <label htmlFor="coverImage" className={labelCls}>
            Cover image URL
          </label>
          <input
            id="coverImage"
            value={values.coverImage}
            onChange={(e) => set("coverImage", e.target.value)}
            className={inputCls}
            placeholder="https://…"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="date" className={labelCls}>
            Publish date
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
          <label htmlFor="status" className={labelCls}>
            Status
          </label>
          <select
            id="status"
            value={values.status}
            onChange={(e) => set("status", e.target.value)}
            className={inputCls}
          >
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
        <div>
          <label htmlFor="slug" className={labelCls}>
            Slug (optional)
          </label>
          <input
            id="slug"
            value={values.slug ?? ""}
            onChange={(e) => set("slug", e.target.value)}
            className={inputCls}
            placeholder="Auto from title"
          />
        </div>
      </div>

      {values.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={values.coverImage}
          alt="Cover preview"
          className="max-h-52 w-full rounded-xl border border-line object-cover"
        />
      )}

      <div>
        <label htmlFor="content" className={labelCls}>
          Content (HTML)
        </label>
        <p className="mt-1 text-xs text-muted-foreground">
          Write in HTML — e.g.{" "}
          <code className="rounded bg-accent-soft px-1 text-accent">
            &lt;p&gt;…&lt;/p&gt;
          </code>
          ,{" "}
          <code className="rounded bg-accent-soft px-1 text-accent">
            &lt;h3&gt;…&lt;/h3&gt;
          </code>
          ,{" "}
          <code className="rounded bg-accent-soft px-1 text-accent">
            &lt;strong&gt;
          </code>
          ,{" "}
          <code className="rounded bg-accent-soft px-1 text-accent">
            &lt;ul&gt;&lt;li&gt;
          </code>
          . Existing posts keep their formatting.
        </p>
        <textarea
          id="content"
          value={values.content}
          onChange={(e) => set("content", e.target.value)}
          rows={20}
          required
          className={`${inputCls} font-mono text-[13px] leading-relaxed`}
          placeholder={"<p>Your opening paragraph…</p>\n<h3>A section heading</h3>\n<p>More thoughts…</p>"}
        />
      </div>
    </form>
  )
}
