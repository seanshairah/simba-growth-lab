import { PostForm } from "@/components/admin/post-form"

export const metadata = { title: "New post — Blog admin" }

export default function NewPostPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 py-12">
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="h-px w-5 bg-accent" />
          New Post
        </p>
        <h1 className="mb-8 mt-3 text-3xl font-medium tracking-tight">
          Write something{" "}
          <em className="font-serif italic text-accent">honest</em>
        </h1>
        <PostForm mode="new" />
      </div>
    </main>
  )
}
