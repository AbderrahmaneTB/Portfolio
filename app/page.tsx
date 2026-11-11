import { Contact } from "@/components/contact"
import { Experience } from "@/components/experience"
import { Hero } from "@/components/hero"
import { IntroProvider } from "@/components/intro"
import { Marquee } from "@/components/marquee"
import { Projects } from "@/components/projects"
import { SiteNav } from "@/components/site-nav"
import { Skills } from "@/components/skills"

export default function Home() {
  return (
    <IntroProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <Hero />
        <Marquee />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </IntroProvider>
  )
}
