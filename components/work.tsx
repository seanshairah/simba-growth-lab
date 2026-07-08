import { work } from "@/lib/content"

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-5 bg-accent" />
            Selected Work
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
            Explore my{" "}
            <em className="font-serif italic text-accent">analysis journey</em>
          </h2>
        </div>
        <p className="self-end text-lg leading-relaxed text-muted-foreground md:text-xl">
          A selection of audits, studies and deep-dives across Zimbabwean and
          regional brands — each one built to turn raw engagement data into
          decisions.
        </p>
      </div>

      <div className="mt-14 divide-y divide-line border-y border-line">
        {work.map((item) => (
          <article
            key={item.title}
            className="group grid grid-cols-1 gap-3 py-6 transition-colors md:grid-cols-[1.2fr_1fr_auto] md:items-center md:gap-8"
          >
            <div>
              <h3 className="text-base font-medium tracking-tight transition-colors group-hover:text-accent md:text-lg">
                {item.title}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {item.sector}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.summary}
            </p>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-card px-3 py-1 text-[11px] uppercase tracking-wide text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
