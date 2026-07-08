import { notFound } from "next/navigation"
import { getPostBySlug } from "@/lib/blog-data"
import { blocksToText } from "@/lib/blocks"
import { PostForm } from "@/components/admin/post-form"

export const dynamic = "force-dynamic"

export const metadata = { title: "Edit post — Blog admin" }

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 py-12">
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-accent" />
          Edit Post
        </p>
        <h1 className="mb-8 mt-3 truncate text-3xl font-medium tracking-tight">
          {post.title}
        </h1>
        <PostForm
          mode="edit"
          initial={{
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            tag: post.tag,
            date: post.date,
            readTime: post.readTime,
            content: blocksToText(post.content),
          }}
        />
      </div>
    </main>
  )
}
