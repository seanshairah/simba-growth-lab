import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { formatDate, gradientForSlug } from "@/lib/posts"
import { getAllPosts, getPostBySlug } from "@/lib/blog-data"
import { site } from "@/lib/content"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug)
  if (!post) return {}
  return {
    title: `${post.title} — ${site.shortName}`,
    description: post.excerpt,
    openGraph: post.coverImage
      ? { images: [{ url: post.coverImage }], title: post.title }
      : { title: post.title },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const post = await getPostBySlug((await params).slug)
  if (!post) notFound()

  const others = (await getAllPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

  return (
    <main>
      <SiteHeader />

      <article>
        <header className="border-b border-line bg-card">
          <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-16">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              All posts
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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

          {post.coverImage ? (
            <div className="mx-auto max-w-4xl px-5 md:px-8">
              <div className="overflow-hidden rounded-2xl border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="max-h-[520px] w-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div
              className="h-2 w-full"
              style={{ background: gradientForSlug(post.slug) }}
            />
          )}
        </header>

        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-16">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

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
