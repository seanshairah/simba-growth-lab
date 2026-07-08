"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Lock } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push("/admin")
      router.refresh()
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || "Login failed. Please try again.")
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Link href="/" className="flex items-center justify-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-ink text-xs font-semibold text-ink-foreground">
            SG
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Simba Growth Lab
          </span>
        </Link>

        <div className="mt-8 rounded-2xl border border-line bg-card p-8 shadow-[0_18px_40px_-24px_rgba(22,22,22,0.4)]">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent-soft">
              <Lock className="size-4 text-accent" />
            </span>
            <div>
              <h1 className="text-lg font-medium tracking-tight">
                Admin login
              </h1>
              <p className="text-xs text-muted-foreground">
                Sign in to manage the blog
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-wide text-muted-foreground"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
                className="mt-2 w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-accent-soft px-4 py-2.5 text-sm text-accent">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-ink-foreground transition-colors hover:bg-accent disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
              <ArrowRight className="size-4" />
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-accent">
            ← Back to the website
          </Link>
        </p>
      </div>
    </main>
  )
}
