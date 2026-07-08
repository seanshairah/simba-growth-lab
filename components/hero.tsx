import Image from "next/image"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { site } from "@/lib/content"

const marqueeItems = [
  "Marketing Analytics",
  "Growth Strategy",
  "Funnel Audits",
  "Competitive Intelligence",
  "Social Performance",
  "Consumer Behaviour",
]

export function Hero() {
  return (
    <section id="top" className="border-b border-line bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-[1fr_auto] md:items-stretch">
        <div className="relative flex flex-col justify-between gap-10 px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16">
          <p className="pointer-events-none absolute left-2 top-1/2 hidden -translate-y-1/2 -rotate-180 text-[11px] uppercase tracking-[0.2em] text-muted-foreground [writing-mode:vertical-rl] lg:block">
            Marketing Analyst — Harare
          </p>

          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 md:gap-x-14">
            <div>
              <p className="text-3xl font-semibold tracking-tight md:text-4xl">
                6<span className="text-accent">+</span>
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                Industries analysed
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold tracking-tight md:text-4xl">
                3
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                Core services
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-background px-3 py-1.5 text-xs font-medium">
              <span className="size-2 rounded-full bg-accent" />
              Available for new projects
            </span>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-150 duration-700">
            <h1 className="text-[clamp(4rem,14vw,9rem)] font-light leading-none tracking-tight">
              Hello<span className="text-accent">.</span>
            </h1>
            <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
              — I&apos;m {site.shortName}, friends call me Simba. A{" "}
              <span className="text-foreground">{site.role.toLowerCase()}</span>{" "}
              turning complex digital data into{" "}
              <em className="font-serif text-xl italic text-accent md:text-2xl">
                profitable growth roadmaps
              </em>
              .
            </p>
          </div>

          <div className="flex items-center justify-between animate-in fade-in fill-mode-both delay-300 duration-700">
            <a
              href="#about"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              Scroll down
              <ArrowDown className="size-4" />
            </a>
            <a
              href={site.contraUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline md:hidden"
            >
              Book a Call
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        <div className="relative md:w-[380px] lg:w-[440px]">
          <Image
            src="/images/portrait-bw.jpg"
            alt={`Black and white portrait of ${site.name}`}
            width={960}
            height={951}
            priority
            className="h-72 w-full object-cover object-top grayscale sm:h-96 md:h-full"
          />
        </div>
      </div>

      <div className="marquee-band overflow-hidden border-t border-line bg-ink py-3.5 text-ink-foreground">
        <div className="marquee-track flex w-max items-center">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center">
              <span
                className={
                  i % 2 === 0
                    ? "whitespace-nowrap font-serif text-lg italic text-ink-foreground/90"
                    : "whitespace-nowrap text-[11px] uppercase tracking-[0.25em] text-ink-foreground/60"
                }
              >
                {item}
              </span>
              <span
                className="mx-8 h-px w-8 bg-ink-foreground/20"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
