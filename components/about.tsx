import Image from "next/image"
import { MapPin, Coffee, Search, Smile, BarChart3 } from "lucide-react"
import { site } from "@/lib/content"
import { Reveal } from "@/components/reveal"

const funFacts = [
  {
    icon: Coffee,
    label: "Fuelled by",
    value: "Strong coffee & clean datasets",
  },
  {
    icon: Search,
    label: "Happiest when",
    value: "An audit uncovers a budget leak",
  },
  {
    icon: BarChart3,
    label: "Guilty pleasure",
    value: "A beautifully labelled spreadsheet",
  },
  {
    icon: Smile,
    label: "Off duty",
    value: "Good art, good people, good laughs",
  },
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <Reveal>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent" />
            About Me
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
            Clarity over
            <br />
            vanity metrics<span className="text-accent">.</span>
          </h2>

          <div className="mt-10 -rotate-2 transition-transform duration-500 hover:rotate-0">
            <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_18px_40px_-24px_rgba(22,22,22,0.4)]">
              <div className="relative">
                <Image
                  src="/images/about-color.jpg"
                  alt={`${site.name} smiling in front of sculptures in Harare`}
                  width={1200}
                  height={1200}
                  className="aspect-square w-full object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
                  That&apos;s me
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <p className="text-sm font-medium">{site.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3.5 text-accent" />
                  {site.location}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-5 text-center text-sm text-muted-foreground md:text-left">
            Usually smiling — especially after a clean dataset.
          </p>
        </Reveal>

        <div className="flex flex-col justify-between gap-10">
          <Reveal delay={100}>
            <p className="text-xl leading-relaxed text-foreground md:text-2xl">
              {site.bio}
            </p>
          </Reveal>

          <Reveal delay={150}>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              A few honest facts
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {funFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="group rounded-2xl border border-line bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent"
                >
                  <fact.icon className="size-5 text-accent" />
                  <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
                    {fact.label}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-card p-6">
                <p className="text-sm font-medium">Past the dashboard</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  I dissect real consumer behaviour — not surface-level numbers
                  — so every recommendation is grounded in how your customers
                  actually act.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-card p-6">
                <p className="text-sm font-medium">Built for scaling brands</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  From technical performance audits to competitive
                  intelligence, the goal is always the same: eliminate budget
                  leaks and give you a clear roadmap to win.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
