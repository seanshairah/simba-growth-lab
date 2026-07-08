import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Work } from "@/components/work"
import { BlogSection } from "@/components/blog-section"
import { Cta } from "@/components/cta"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <About />
      <Services />
      <Work />
      <BlogSection />
      <Cta />
      <SiteFooter />
    </main>
  )
}
