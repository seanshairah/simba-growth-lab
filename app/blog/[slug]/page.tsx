import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { posts, getPost, formatDate } from "@/lib/posts"
import { site } from "@/lib/content"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const post = getPost((await params).slug)
  if (!post) return {}
  return {
    title: `${post.title} — ${site.shortName}`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const post = getPost((await params).slug)
  if (!post) notFound()

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <main>
      <SiteHeader />

      <article>
        <header className="border-b border-line bg-card">
          <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              All posts
            </Link>
            <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full bg-accent px-3 py-1 font-medium uppercase tracking-wide text-white">
                {post.tag}
              </span>
              <span>
                {formatDate(post.date)} · {post.readTime}
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          </div>
          <div className="h-2 w-full" style={{ background: post.art }} />
        </header>

        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-16">
          <div className="space-y-6">
            {post.content.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    className="pt-4 text-xl font-medium tracking-tight md:text-2xl"
                  >
                    {block.text}
                  </h2>
                )
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="rounded-r-2xl border-l-4 border-accent bg-card px-6 py-5 text-lg font-medium leading-relaxed"
                  >
                    {block.text}
                  </blockquote>
                )
              }
              return (
                <p
                  key={i}
                  className="text-base leading-relaxed text-foreground/85 md:text-lg"
                >
                  {block.text}
                </p>
              )
            })}
          </div>

          <div className="mt-14 rounded-2xl bg-ink p-8 text-ink-foreground">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-foreground/60">
              Work with me
            </p>
            <p className="mt-3 text-xl font-medium tracking-tight">
              Want this kind of clarity on your own numbers?
            </p>
            <a
              href={site.contraUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Book a Call
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          {others.length > 0 && (
            <div className="mt-14">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Keep reading
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {others.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/blog/${other.slug}`}
                    className="group rounded-2xl border border-line bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent"
                  >
                    <p className="text-xs text-muted-foreground">
                      {formatDate(other.date)} · {other.readTime}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-snug group-hover:text-accent">
                      {other.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}
