import "server-only"
import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

// Must match middleware.ts, which guards /admin pages with the same secret.
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "mercury-blog-secret-key-change-in-production"
)

export const AUTH_COOKIE = "auth_token"

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "simba2026"
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

/** True when the current request carries a valid admin session cookie. */
export async function isAdminRequest(): Promise<boolean> {
  const token = (await cookies()).get(AUTH_COOKIE)?.value
  if (!token) return false
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}
