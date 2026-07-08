import { NextResponse } from "next/server"
import {
  isAdminRequest,
  getAdminProfile,
  verifyPassword,
  updatePassword,
  updateProfile,
} from "@/lib/admin-auth"
import { hasDatabase } from "@/lib/blog-data"

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const profile = await getAdminProfile()
  return NextResponse.json({ ...profile, hasDatabase: hasDatabase() })
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
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  const currentPassword = String(body.currentPassword || "")
  if (!(await verifyPassword(currentPassword))) {
    return NextResponse.json(
      { error: "Current password is incorrect." },
      { status: 403 }
    )
  }

  const name = typeof body.name === "string" ? body.name.trim() : ""
  if (name) await updateProfile(name)

  const newPassword = String(body.newPassword || "")
  if (newPassword) {
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters." },
        { status: 400 }
      )
    }
    await updatePassword(newPassword)
  }

  return NextResponse.json({ ok: true })
}
