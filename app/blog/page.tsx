import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { formatDate, gradientForSlug, type Article } from "@/lib/posts"
import { getAllPosts } from "@/lib/blog-data"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Blog — Simbarashe Able Mukondo",
  description:
    "Growth insights and honest numbers: marketing analytics, funnel audits and social media performance, written from the data up.",
}

function Cover({ post }: { post: Article }) {
  if (post.coverImage) {
    return (
      <div className="relative h-48 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage}
          alt=""
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-ink">
          {post.tag}
        </span>
      </div>
    )
  }
  return (
    <div
      className="relative h-48 w-full"
      style={{ background: gradientForSlug(post.slug) }}
    >
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-ink">
        {post.tag}
      </span>
    </div>
  )
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const [lead, ...rest] = posts

  return (
    <main>
      <SiteHeader />
      <section className="border-b border-line bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-5 bg-accent" />
            Blog
          </p>
          <h1 className="mt-4 text-4xl font-light tracking-tight md:text-6xl">
            Growth insights &
            <br />
            <em className="font-serif italic text-accent">honest numbers</em>
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Notes from inside the data — on analytics, funnels, governance and
            social performance. No fluff, no vanity metrics.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        {lead && (
          <Reveal>
            <Link
              href={`/blog/${lead.slug}`}
              className="group mb-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent md:grid-cols-2"
            >
              <div className="relative min-h-56 w-full overflow-hidden">
                {lead.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={lead.coverImage}
                    alt=""
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="size-full"
                    style={{ background: gradientForSlug(lead.slug) }}
                  />
                )}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-ink">
                  Latest
                </span>
              </div>
              <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
                <p className="text-xs uppercase tracking-wide text-accent">
                  {lead.tag}
                </p>
                <h2 className="text-2xl font-medium leading-tight tracking-tight group-hover:text-accent md:text-3xl">
                  {lead.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {lead.excerpt}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(lead.date)} · {lead.readTime}
                </p>
              </div>
            </Link>
          </Reveal>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent"
              >
                <Cover post={post} />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-muted-foreground">
                    {formatDate(post.date)} · {post.readTime}
                  </p>
                  <h2 className="mt-2 text-lg font-medium leading-snug tracking-tight group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Read article
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
