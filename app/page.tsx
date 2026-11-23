import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { CaseStudy } from "@/components/CaseStudy";
import { Capabilities } from "@/components/Capabilities";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <SelectedWork />
        <CaseStudy />
        <Capabilities />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
