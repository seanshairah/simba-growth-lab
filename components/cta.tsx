import { ArrowUpRight } from "lucide-react"
import { site } from "@/lib/content"

export function Cta() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-16 text-center text-ink-foreground md:px-12 md:py-20">
        <span className="float-slow pointer-events-none absolute -left-10 top-8 size-32 rounded-full bg-accent/20 blur-2xl" />
        <span className="float-slower pointer-events-none absolute -right-8 bottom-8 size-40 rounded-full bg-accent/15 blur-2xl" />
        <span className="float-slow pointer-events-none absolute right-16 top-10 hidden size-10 rounded-full border-2 border-accent/40 md:block" />
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ink-foreground/60">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          Ready for work
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-medium tracking-tight md:text-5xl">
          Got a vision? Let&apos;s turn your{" "}
          <em className="font-serif italic text-accent">
            data into growth
          </em>
          .
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
          className="mt-8 inline-flex items-center gap-1 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
        >
          Book a Call
          <ArrowUpRight className="size-4" />
        </a>
        <p className="mt-8 font-serif text-xl italic text-ink-foreground/50">
          — Simba
        </p>
      </div>
    </section>
  )
}
