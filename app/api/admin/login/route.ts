import { NextResponse } from "next/server"
import {
  AUTH_COOKIE,
  createSessionToken,
  verifyPassword,
} from "@/lib/admin-auth"

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }))

  if (!(await verifyPassword(password))) {
    return NextResponse.json(
      { error: "Incorrect password. Please try again." },
      { status: 401 }
    )
  }

  const token = await createSessionToken()
  const response = NextResponse.json({ ok: true })
  response.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
