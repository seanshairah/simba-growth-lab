import { ArrowUpRight } from "lucide-react"
import { site } from "@/lib/content"

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Me" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-foreground/60 transition-colors hover:text-ink-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={site.contraUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent"
        >
          Hire me on Contra
          <ArrowUpRight className="size-4" />
        </a>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-ink-foreground/50 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </p>
          <p>
            {site.name} — {site.role}
          </p>
        </div>
      </div>
    </footer>
  )
}
