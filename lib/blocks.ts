import type { PostBlock } from "@/lib/posts"

// Simple authoring format used in the admin editor:
//   "## Heading"  -> h2 block
//   "> Quote"     -> quote block
//   plain text    -> paragraph block
// Blocks are separated by blank lines.

export function blocksToText(blocks: PostBlock[]): string {
  return blocks
    .map((b) => {
      if (b.type === "h2") return `## ${b.text}`
      if (b.type === "quote") return `> ${b.text}`
      return b.text
    })
    .join("\n\n")
}

export function textToBlocks(text: string): PostBlock[] {
  return text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim().replace(/\s*\n\s*/g, " "))
    .filter(Boolean)
    .map((chunk): PostBlock => {
      if (chunk.startsWith("## ")) return { type: "h2", text: chunk.slice(3).trim() }
      if (chunk.startsWith("> ")) return { type: "quote", text: chunk.slice(2).trim() }
      return { type: "p", text: chunk }
    })
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80)
}

export function estimateReadTime(blocks: PostBlock[]): string {
  const words = blocks.reduce((n, b) => n + b.text.split(/\s+/).length, 0)
  return `${Math.max(1, Math.round(words / 200))} min read`
}
