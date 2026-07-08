import { ArrowUpRight } from "lucide-react"
import { site } from "@/lib/content"

export function Cta() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
      <div className="rounded-3xl bg-ink px-6 py-16 text-center text-ink-foreground md:px-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-foreground/60">
          Ready for work
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-medium tracking-tight md:text-5xl">
          Got a vision? Let&apos;s turn your data into growth.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-foreground/70 md:text-base">
          Whether you need ongoing analytics leadership or a one-off audit,
          I&apos;m always open to collaborating with brands that are serious
          about scaling.
        </p>
        <a
          href={site.contraUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-1 rounded-full bg-ink-foreground px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
        >
          Book a Call
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </section>
  )
}
