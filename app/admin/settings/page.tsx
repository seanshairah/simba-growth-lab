"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, KeyRound, Save } from "lucide-react"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [hasDb, setHasDb] = useState(true)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await fetch("/api/admin/settings")
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      const data = await res.json().catch(() => ({}))
      setEmail(data.email ?? "")
      setName(data.name ?? "")
      setHasDb(Boolean(data.hasDatabase))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSaved(false)
    if (newPassword && newPassword !== confirm) {
      setError("New password and confirmation do not match.")
      return
    }
    setSaving(true)
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword, name }),
    })
    const data = await res.json().catch(() => ({}))
    setSaving(false)
    if (res.ok) {
      setSaved(true)
      setCurrentPassword("")
      setNewPassword("")
      setConfirm("")
    } else {
      setError(data.error || "Could not save settings.")
    }
  }

  const inputCls =
    "mt-2 w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
  const labelCls = "text-xs uppercase tracking-wide text-muted-foreground"

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-5 py-12">
        <Link
          href="/admin"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Dashboard
        </Link>

        <p className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px w-5 bg-accent" />
          Settings
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight">
          Account <em className="font-serif italic text-accent">settings</em>
        </h1>

        {!hasDb && (
          <p className="mt-6 rounded-xl bg-accent-soft px-4 py-3 text-sm text-accent">
            No database connected — settings are read-only. Add DATABASE_URL in
            Vercel to change your password.
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-line bg-card p-6 md:p-8"
        >
          <div>
            <label className={labelCls}>Email</label>
            <input
              value={email}
              disabled
              className={`${inputCls} opacity-60`}
            />
          </div>

          <div>
            <label htmlFor="name" className={labelCls}>
              Display name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
              placeholder="Your name"
            />
          </div>

          <div className="border-t border-line pt-6">
            <p className="flex items-center gap-2 text-sm font-medium">
              <KeyRound className="size-4 text-accent" />
              Change password
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="current" className={labelCls}>
                  Current password
                </label>
                <input
                  id="current"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className={inputCls}
                  placeholder="Required to save any change"
                />
              </div>
              <div>
                <label htmlFor="new" className={labelCls}>
                  New password
                </label>
                <input
                  id="new"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={inputCls}
                  placeholder="Leave blank to keep current"
                />
              </div>
              <div>
                <label htmlFor="confirm" className={labelCls}>
                  Confirm new password
                </label>
                <input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={inputCls}
                  placeholder="Repeat new password"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-accent-soft px-4 py-2.5 text-sm text-accent">
              {error}
            </p>
          )}
          {saved && (
            <p className="inline-flex items-center gap-2 rounded-xl bg-accent-soft px-4 py-2.5 text-sm text-accent">
              <Check className="size-4" />
              Settings saved.
            </p>
          )}

          <button
            type="submit"
            disabled={saving || !hasDb}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ink-foreground transition-colors hover:bg-accent disabled:opacity-60"
          >
            <Save className="size-4" />
            {saving ? "Saving…" : "Save changes"}
          </button>
        </form>
      </div>
    </main>
  )
}
