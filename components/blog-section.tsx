import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { formatDate } from "@/lib/posts"
import { getAllPosts } from "@/lib/blog-data"
import { Reveal } from "@/components/reveal"

export async function BlogSection() {
  const posts = (await getAllPosts()).slice(0, 3)
  return (
    <section id="blog" className="border-t border-line bg-card">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-px w-5 bg-accent" />
                Blog
              </p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                Growth insights &{" "}
                <em className="font-serif italic text-accent">
                  honest numbers
                </em>
              </h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              View all posts
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-background transition-all duration-300 hover:-translate-y-1 hover:border-accent"
              >
                <div
                  className="relative h-40 w-full"
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
                  <h3 className="mt-2 text-base font-medium leading-snug tracking-tight group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
