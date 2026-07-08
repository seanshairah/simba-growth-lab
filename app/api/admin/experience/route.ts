import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAdminRequest } from "@/lib/admin-auth"
import { getAllTimeline, upsertTimelineEntry } from "@/lib/site-data"
import { hasDatabase } from "@/lib/blog-data"

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const entries = await getAllTimeline()
  return NextResponse.json({ entries, hasDatabase: hasDatabase() })
}

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "No database connected. Add DATABASE_URL in Vercel first." },
      { status: 503 }
    )
  }

  const body = await request.json().catch(() => null)
  if (!body?.title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 })
  }

  await upsertTimelineEntry({
    id: body.id ? Number(body.id) : undefined,
    kind: body.kind === "education" ? "education" : "experience",
    title: String(body.title).trim(),
    subtitle: String(body.subtitle || "").trim(),
    location: String(body.location || "").trim(),
    period: String(body.period || "").trim(),
    description: String(body.description || "").trim(),
    tags: String(body.tags || "").trim(),
    sortOrder: Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0,
  })

  revalidatePath("/")
  return NextResponse.json({ ok: true })
}
