import "server-only"
import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"
import { neon } from "@neondatabase/serverless"

// Must match middleware.ts, which guards /admin pages with the same secret.
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "mercury-blog-secret-key-change-in-production"
)

export const AUTH_COOKIE = "auth_token"

/** Recovery password — always works so the account can't be locked out. */
function recoveryPassword(): string {
  return process.env.ADMIN_PASSWORD || "simba2026"
}

function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) return null
  try {
    return neon(url)
  } catch {
    return null
  }
}

function adminEmail(): string {
  return process.env.ADMIN_EMAIL || "mukondos@gmail.com"
}

type AdminRow = {
  id: number
  email: string
  name: string | null
  password_hash: string | null
}

async function getAdminRow(): Promise<AdminRow | null> {
  const sql = getSql()
  if (!sql) return null
  try {
    const rows = (await sql`
      SELECT id, email, name, password_hash
      FROM admin_users
      WHERE email = ${adminEmail()}
      LIMIT 1
    `) as AdminRow[]
    if (rows.length > 0) return rows[0]
    const any = (await sql`
      SELECT id, email, name, password_hash FROM admin_users ORDER BY id LIMIT 1
    `) as AdminRow[]
    return any[0] ?? null
  } catch {
    return null
  }
}

export async function getAdminProfile(): Promise<{
  email: string
  name: string
}> {
  const row = await getAdminRow()
  return {
    email: row?.email ?? adminEmail(),
    name: row?.name ?? "Simbarashe Mukondo",
  }
}

/** True when password is the recovery password or matches the stored hash. */
export async function verifyPassword(password: string): Promise<boolean> {
  if (!password) return false
  if (password === recoveryPassword()) return true
  const row = await getAdminRow()
  if (row?.password_hash) {
    try {
      return await bcrypt.compare(password, row.password_hash)
    } catch {
      return false
    }
  }
  return false
}

/** Update the stored admin password (hashed). Requires a database. */
export async function updatePassword(newPassword: string): Promise<void> {
  const sql = getSql()
  if (!sql) throw new Error("DATABASE_URL is not configured")
  const hash = await bcrypt.hash(newPassword, 10)
  const row = await getAdminRow()
  if (row) {
    await sql`UPDATE admin_users SET password_hash = ${hash} WHERE id = ${row.id}`
  } else {
    await sql`
      INSERT INTO admin_users (email, password_hash, name, created_at)
      VALUES (${adminEmail()}, ${hash}, ${"Simbarashe Mukondo"}, now())
    `
  }
}

export async function updateProfile(name: string): Promise<void> {
  const sql = getSql()
  if (!sql) throw new Error("DATABASE_URL is not configured")
  const row = await getAdminRow()
  if (row) {
    await sql`UPDATE admin_users SET name = ${name} WHERE id = ${row.id}`
  }
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
