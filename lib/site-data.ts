import "server-only"
import { neon } from "@neondatabase/serverless"

export type TimelineEntry = {
  id: number
  kind: "experience" | "education"
  title: string
  subtitle: string
  location: string
  period: string
  description: string
  tags: string
  sortOrder: number
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

type Row = {
  id: number
  kind: string
  title: string
  subtitle: string
  location: string
  period: string
  description: string
  tags: string
  sort_order: number
}

function toEntry(row: Row): TimelineEntry {
  return {
    id: row.id,
    kind: row.kind === "education" ? "education" : "experience",
    title: row.title,
    subtitle: row.subtitle,
    location: row.location,
    period: row.period,
    description: row.description,
    tags: row.tags,
    sortOrder: row.sort_order,
  }
}

/** Split a stored description into individual bullet lines. */
export function descriptionLines(description: string): string[] {
  return description
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
}

/** Split a stored csv tag string into a clean array. */
export function tagList(tags: string): string[] {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
}

// Fallback shown only when the database is unreachable.
const fallback: TimelineEntry[] = [
  {
    id: 1,
    kind: "experience",
    title: "Senior Marketing Manager",
    subtitle: "Chop Chop Group & 258Hotel",
    location: "Harare",
    period: "Aug 2024 – Present",
    description:
      "Direct all marketing operations and brand positioning for a high-volume hospitality group, delivering a 50% revenue increase within 12 months.",
    tags: "Hospitality, Brand Strategy",
    sortOrder: 0,
  },
]

export async function getTimeline(
  kind: "experience" | "education"
): Promise<TimelineEntry[]> {
  const sql = getSql()
  if (sql) {
    try {
      const rows = (await sql`
        SELECT id, kind, title, subtitle, location, period, description, tags, sort_order
        FROM timeline_entries
        WHERE kind = ${kind}
        ORDER BY sort_order ASC, id ASC
      `) as Row[]
      return rows.map(toEntry)
    } catch {
      // fall through
    }
  }
  return fallback.filter((e) => e.kind === kind)
}

export async function getAllTimeline(): Promise<TimelineEntry[]> {
  const sql = getSql()
  if (!sql) return fallback
  try {
    const rows = (await sql`
      SELECT id, kind, title, subtitle, location, period, description, tags, sort_order
      FROM timeline_entries
      ORDER BY kind ASC, sort_order ASC, id ASC
    `) as Row[]
    return rows.map(toEntry)
  } catch {
    return fallback
  }
}

export async function getTimelineEntry(
  id: number
): Promise<TimelineEntry | undefined> {
  const sql = getSql()
  if (!sql) return undefined
  try {
    const rows = (await sql`
      SELECT id, kind, title, subtitle, location, period, description, tags, sort_order
      FROM timeline_entries WHERE id = ${id} LIMIT 1
    `) as Row[]
    return rows[0] ? toEntry(rows[0]) : undefined
  } catch {
    return undefined
  }
}

export type TimelineInput = {
  id?: number
  kind: "experience" | "education"
  title: string
  subtitle: string
  location: string
  period: string
  description: string
  tags: string
  sortOrder: number
}

export async function upsertTimelineEntry(input: TimelineInput): Promise<void> {
  const sql = getSql()
  if (!sql) throw new Error("DATABASE_URL is not configured")
  if (input.id) {
    await sql`
      UPDATE timeline_entries SET
        kind = ${input.kind}, title = ${input.title}, subtitle = ${input.subtitle},
        location = ${input.location}, period = ${input.period},
        description = ${input.description}, tags = ${input.tags},
        sort_order = ${input.sortOrder}, updated_at = now()
      WHERE id = ${input.id}
    `
  } else {
    await sql`
      INSERT INTO timeline_entries
        (kind, title, subtitle, location, period, description, tags, sort_order)
      VALUES
        (${input.kind}, ${input.title}, ${input.subtitle}, ${input.location},
         ${input.period}, ${input.description}, ${input.tags}, ${input.sortOrder})
    `
  }
}

export async function deleteTimelineEntry(id: number): Promise<void> {
  const sql = getSql()
  if (!sql) throw new Error("DATABASE_URL is not configured")
  await sql`DELETE FROM timeline_entries WHERE id = ${id}`
}
