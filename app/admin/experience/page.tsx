"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Pencil, Plus, Save, Trash2, X } from "lucide-react"

type Entry = {
  id: number
  kind: "experience" | "education"
  title: string
  subtitle: string
  location: string
  period: string
  description: string
  tags: string
  sortOrder: number
}

const blank = (kind: Entry["kind"], sortOrder: number): Entry => ({
  id: 0,
  kind,
  title: "",
  subtitle: "",
  location: "",
  period: "",
  description: "",
  tags: "",
  sortOrder,
})

export default function AdminExperiencePage() {
  const router = useRouter()
  const [entries, setEntries] = useState<Entry[] | null>(null)
  const [hasDb, setHasDb] = useState(true)
  const [editing, setEditing] = useState<Entry | null>(null)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  async function load() {
    const res = await fetch("/api/admin/experience")
    if (res.status === 401) {
      router.push("/admin/login")
      return
    }
    const data = await res.json().catch(() => ({}))
    setEntries(data.entries ?? [])
    setHasDb(Boolean(data.hasDatabase))
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (!editing) return
    setSaving(true)
    setError("")
    const res = await fetch("/api/admin/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    })
    const data = await res.json().catch(() => ({}))
    setSaving(false)
    if (res.ok) {
      setEditing(null)
      load()
    } else {
      setError(data.error || "Could not save.")
    }
  }

  async function remove(id: number) {
    if (!confirm("Delete this entry?")) return
    await fetch(`/api/admin/experience/${id}`, { method: "DELETE" })
    load()
  }

  const experiences = entries?.filter((e) => e.kind === "experience") ?? []
  const education = entries?.filter((e) => e.kind === "education") ?? []
  const inputCls =
    "mt-2 w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
  const labelCls = "text-xs uppercase tracking-wide text-muted-foreground"

  function set<K extends keyof Entry>(key: K, value: Entry[K]) {
    setEditing((v) => (v ? { ...v, [key]: value } : v))
  }

  function Group({
    title,
    kind,
    items,
  }: {
    title: string
    kind: Entry["kind"]
    items: Entry[]
  }) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium tracking-tight">{title}</h2>
          <button
            type="button"
            onClick={() => setEditing(blank(kind, items.length))}
            className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <Plus className="size-3.5" />
            Add
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">Nothing here yet.</p>
          )}
          {items.map((entry) => (
            <div
              key={entry.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-line bg-card p-4"
            >
              <div>
                <p className="text-sm font-medium">{entry.title}</p>
                <p className="text-sm text-accent">{entry.subtitle}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  {entry.period}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
              </div>
              <div className="flex flex-none gap-1">
                <button
                  type="button"
                  onClick={() => setEditing(entry)}
                  className="inline-flex size-8 items-center justify-center rounded-lg border border-line transition-colors hover:border-accent hover:text-accent"
                  aria-label="Edit"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(entry.id)}
                  className="inline-flex size-8 items-center justify-center rounded-lg border border-line transition-colors hover:border-accent hover:text-accent"
                  aria-label="Delete"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 py-12">
        <Link
          href="/admin"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Dashboard
        </Link>

        <p className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px w-5 bg-accent" />
          Experience
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight">
          Experience &{" "}
          <em className="font-serif italic text-accent">education</em>
        </h1>

        {!hasDb && (
          <p className="mt-6 rounded-xl bg-accent-soft px-4 py-3 text-sm text-accent">
            No database connected — read-only. Add DATABASE_URL in Vercel to
            edit.
          </p>
        )}

        {entries === null ? (
          <p className="mt-10 text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="mt-10 space-y-12">
            <Group title="Work experience" kind="experience" items={experiences} />
            <Group title="Education & development" kind="education" items={education} />
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-sm">
          <form
            onSubmit={save}
            className="my-8 w-full max-w-xl space-y-4 rounded-2xl border border-line bg-background p-6 shadow-xl md:p-8"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">
                {editing.id ? "Edit" : "Add"}{" "}
                {editing.kind === "education" ? "education" : "experience"}
              </h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="inline-flex size-8 items-center justify-center rounded-lg border border-line hover:border-accent"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            <div>
              <label className={labelCls}>
                {editing.kind === "education" ? "Qualification" : "Role title"}
              </label>
              <input
                value={editing.title}
                onChange={(e) => set("title", e.target.value)}
                required
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>
                {editing.kind === "education" ? "Institution" : "Company"}
              </label>
              <input
                value={editing.subtitle}
                onChange={(e) => set("subtitle", e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Period</label>
                <input
                  value={editing.period}
                  onChange={(e) => set("period", e.target.value)}
                  className={inputCls}
                  placeholder="Aug 2024 – Present"
                />
              </div>
              <div>
                <label className={labelCls}>Order (0 = first)</label>
                <input
                  type="number"
                  value={editing.sortOrder}
                  onChange={(e) => set("sortOrder", Number(e.target.value))}
                  className={inputCls}
                />
              </div>
            </div>

            {editing.kind === "experience" && (
              <>
                <div>
                  <label className={labelCls}>Location</label>
                  <input
                    value={editing.location}
                    onChange={(e) => set("location", e.target.value)}
                    className={inputCls}
                    placeholder="Harare"
                  />
                </div>
                <div>
                  <label className={labelCls}>Tags (comma separated)</label>
                  <input
                    value={editing.tags}
                    onChange={(e) => set("tags", e.target.value)}
                    className={inputCls}
                    placeholder="Hospitality, Brand Strategy"
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    Highlights (one bullet per line)
                  </label>
                  <textarea
                    value={editing.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={7}
                    className={inputCls}
                    placeholder={"Delivered a 50% revenue increase…\nChaired cross-functional initiatives…"}
                  />
                </div>
              </>
            )}

            {error && (
              <p className="rounded-xl bg-accent-soft px-4 py-2.5 text-sm text-accent">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-full border border-line px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !hasDb}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-sm font-medium text-ink-foreground transition-colors hover:bg-accent disabled:opacity-60"
              >
                <Save className="size-4" />
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  )
}
