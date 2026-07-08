import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAdminRequest } from "@/lib/admin-auth"
import { deleteTimelineEntry } from "@/lib/site-data"
import { hasDatabase } from "@/lib/blog-data"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "No database connected." },
      { status: 503 }
    )
  }
  const { id } = await params
  await deleteTimelineEntry(Number(id))
  revalidatePath("/")
  return NextResponse.json({ ok: true })
}
