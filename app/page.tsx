export const revalidate = 300

import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Work } from "@/components/work"
import { Experience } from "@/components/experience"
import { Testimonials } from "@/components/testimonials"
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
      <Experience />
      <Testimonials />
      <BlogSection />
      <Cta />
      <SiteFooter />
    </main>
  )
}
