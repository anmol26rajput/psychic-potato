import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import Stack from "@/components/Stack";
import Services from "@/components/Services";
import Faq from "@/components/Faq";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { JsonLd, faqSchema, profilePageSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd schemas={[profilePageSchema, faqSchema]} />
      <Hero />
      <Brands />
      <About />
      <Testimonials />
      <Process />
      <Stack />
      <Services />
      <Projects />
      <Faq />
      <Contact />
    </>
  );
}
