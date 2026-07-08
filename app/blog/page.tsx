import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { posts, formatDate } from "@/lib/posts"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = {
  title: "Blog — Simbarashe Able Mukondo",
  description:
    "Growth insights and honest numbers: marketing analytics, funnel audits and social media performance, written from the data up.",
}

export default function BlogPage() {
  return (
    <main>
      <SiteHeader />
      <section className="border-b border-line bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent" />
            Blog
          </p>
          <h1 className="mt-4 text-4xl font-light tracking-tight md:text-6xl">
            Growth insights &
            <br />
            honest numbers<span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Notes from inside the data — on analytics, funnels and social
            performance. No fluff, no vanity metrics.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent"
              >
                <div
                  className="relative h-44 w-full"
                  style={{ background: post.art }}
                >
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-ink">
                    {post.tag}
                  </span>
                  <ArrowUpRight className="absolute bottom-4 right-4 size-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-muted-foreground">
                    {formatDate(post.date)} · {post.readTime}
                  </p>
                  <h2 className="mt-2 text-lg font-medium leading-snug tracking-tight group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
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
