import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"

const testimonials = [
  {
    quote:
      "Simba runs our marketing and the difference is night and day. He doesn't guess — he shows us the numbers, tells us exactly what's working, and our online orders have never been busier.",
    name: "ChopChop Restaurant",
    role: "Harare, Zimbabwe",
    style:
      "bg-ink text-ink-foreground md:-rotate-3 md:translate-y-4",
    accentText: "text-accent",
    mutedText: "text-ink-foreground/60",
  },
  {
    quote:
      "The engagement audit showed us exactly where our budget was leaking. Six months later our cost per lead is down and, for the first time, we actually trust our own reports.",
    name: "Marketing Lead",
    role: "Insurance brand",
    style: "bg-card md:rotate-2 md:-translate-y-2",
    accentText: "text-accent",
    mutedText: "text-muted-foreground",
  },
  {
    quote:
      "His competitor benchmark completely changed how we plan content. We stopped copying the big accounts and started beating them on engagement.",
    name: "Brand Manager",
    role: "Hospitality group",
    style: "bg-accent-soft md:rotate-3 md:translate-y-6",
    accentText: "text-accent",
    mutedText: "text-muted-foreground",
  },
  {
    quote:
      "Fractional analytics gave us senior-level insight without a senior salary. Every month we know what to double down on and what to kill.",
    name: "Founder",
    role: "E-commerce startup",
    style: "bg-card md:-rotate-2 md:-translate-y-4",
    accentText: "text-accent",
    mutedText: "text-muted-foreground",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden border-t border-line bg-background">
      <span className="pointer-events-none absolute left-1/2 top-0 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" />
              Kind Words
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
              Don&apos;t take{" "}
              <em className="font-serif italic text-accent">my word</em> for it
              <span className="text-accent">.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name + t.role} delay={i * 120}>
              <figure
                className={cn(
                  "group relative flex h-full flex-col justify-between rounded-2xl border border-line p-6 shadow-[0_16px_36px_-24px_rgba(22,22,22,0.45)] transition-all duration-500 hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_28px_48px_-24px_rgba(226,89,12,0.45)]",
                  i % 2 === 0 ? "-rotate-2" : "rotate-2",
                  t.style
                )}
              >
                <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full border border-background bg-accent" />
                <div>
                  <Quote className={cn("size-6", t.accentText)} />
                  <blockquote className="mt-4 text-sm leading-relaxed">
                    {t.quote}
                  </blockquote>
                </div>
                <figcaption className="mt-6">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className={cn("text-xs", t.mutedText)}>{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
