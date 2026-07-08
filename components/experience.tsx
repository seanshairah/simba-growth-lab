import { GraduationCap } from "lucide-react"
import {
  getTimeline,
  descriptionLines,
  tagList,
  type TimelineEntry,
} from "@/lib/site-data"
import { Reveal } from "@/components/reveal"

function Role({ entry, index }: { entry: TimelineEntry; index: number }) {
  const lines = descriptionLines(entry.description)
  const tags = tagList(entry.tags)
  return (
    <Reveal delay={index * 90}>
      <article className="group relative grid grid-cols-1 gap-4 border-t border-line py-8 md:grid-cols-[1fr_1.6fr] md:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl italic text-accent">
              0{index + 1}
            </span>
            <span className="h-px flex-1 bg-line transition-colors group-hover:bg-accent md:hidden" />
          </div>
          <h3 className="mt-3 text-lg font-medium tracking-tight">
            {entry.title}
          </h3>
          <p className="mt-1 text-sm text-accent">{entry.subtitle}</p>
          <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
            {entry.period}
            {entry.location ? ` · ${entry.location}` : ""}
          </p>
          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-wide text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <ul className="space-y-3">
          {lines.map((line, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
            >
              <span className="mt-2 size-1 flex-none rounded-full bg-accent" />
              {line}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  )
}

export async function Experience() {
  const [roles, education] = await Promise.all([
    getTimeline("experience"),
    getTimeline("education"),
  ])
  if (roles.length === 0 && education.length === 0) return null

  return (
    <section id="experience" className="border-t border-line bg-card">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <div>
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-px w-5 bg-accent" />
                Experience
              </p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                The road so{" "}
                <em className="font-serif italic text-accent">far</em>
              </h2>
            </div>
            <p className="self-end text-lg leading-relaxed text-muted-foreground md:text-xl">
              Five years turning &ldquo;boring&rdquo; brands into
              high-engagement market leaders — bridging creative storytelling
              with commercial data across hospitality, fintech and retail.
            </p>
          </div>
        </Reveal>

        <div className="mt-10">
          {roles.map((entry, i) => (
            <Role key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        {education.length > 0 && (
          <Reveal>
            <div className="mt-14 rounded-2xl border border-line bg-background p-6 md:p-8">
              <p className="flex items-center gap-2 text-sm font-medium">
                <GraduationCap className="size-4 text-accent" />
                Education & development
              </p>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {education.map((entry) => (
                  <div key={entry.id}>
                    <p className="text-sm font-medium leading-snug">
                      {entry.title}
                    </p>
                    <p className="mt-1 text-sm text-accent">{entry.subtitle}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                      {entry.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
