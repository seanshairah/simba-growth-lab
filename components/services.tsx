import { ArrowUpRight } from "lucide-react"
import { services, site } from "@/lib/content"
import { Reveal } from "@/components/reveal"

export function Services() {
  return (
    <section id="services" className="border-y border-line bg-card">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" />
              Services
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
              What I can do for{" "}
              <em className="font-serif italic text-accent">your brand</em>
            </h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-muted-foreground md:text-xl">
            {services.statement}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.items.map((service, i) => (
            <Reveal key={service.number} delay={i * 120} className="h-full">
            <article
              className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-ink hover:text-ink-foreground md:p-7"
            >
              <div>
                <p className="text-xs font-semibold text-accent">
                  {service.number}
                </p>
                <h3 className="mt-5 text-xl font-medium leading-snug tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground group-hover:text-ink-foreground/75">
                  {service.description}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-wide text-muted-foreground group-hover:border-ink-foreground/25 group-hover:text-ink-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={site.contraUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:bg-accent hover:text-white"
          >
            Discuss your project
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
