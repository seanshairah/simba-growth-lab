import Image from "next/image"
import { MapPin } from "lucide-react"
import { site } from "@/lib/content"

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-ink" />
            About Me
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
            Clarity over
            <br />
            vanity metrics.
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-card">
            <Image
              src="/images/portrait-bw.jpg"
              alt={site.name}
              width={480}
              height={476}
              className="aspect-square w-full object-cover object-top grayscale"
            />
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-sm font-medium">{site.name}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                {site.location}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10">
          <p className="text-xl leading-relaxed text-foreground md:text-2xl">
            {site.bio}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-card p-6">
              <p className="text-sm font-medium">Past the dashboard</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                I dissect real consumer behaviour — not surface-level numbers —
                so every recommendation is grounded in how your customers
                actually act.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-card p-6">
              <p className="text-sm font-medium">Built for scaling brands</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                From technical performance audits to competitive intelligence,
                the goal is always the same: eliminate budget leaks and give
                you a clear roadmap to win.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
