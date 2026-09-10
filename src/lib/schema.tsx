import { about, contact, faq, footer, services, tools } from "@/data/content";
import { person, siteDescription, siteName, siteUrl } from "./site";

/** Person schema — tells Google this site *is* Anmol Rajput, tying the name to
 * the GitHub/LinkedIn/Medium profiles so a search on the name surfaces the
 * portfolio rather than only the social accounts. `sameAs` is the field that
 * does that work, so it stays derived from the footer links. */
export const personSchema = {
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: person.name,
  givenName: person.givenName,
  familyName: person.familyName,
  url: siteUrl,
  email: `mailto:${contact.email}`,
  jobTitle: person.jobTitle,
  description: siteDescription,
  image: `${siteUrl}/icon.png`,
  sameAs: footer.socials.map((s) => s.href),
  address: { "@type": "PostalAddress", addressCountry: person.addressCountry },
  worksFor: { "@type": "Organization", name: person.worksFor },
  // Past organisations only — the current employer is `worksFor` above.
  alumniOf: about.experience
    .filter((job) => !job.period.includes("Present"))
    .map((job) => ({
      "@type": "Organization",
      name: job.role.split(" at ")[1] ?? job.role,
    })),
  knowsAbout: [...services.map((s) => s.name), ...tools.map((t) => t.name)],
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: s.name,
      description: s.description,
    },
  })),
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  description: siteDescription,
  inLanguage: "en",
  publisher: { "@id": `${siteUrl}/#person` },
};

/** Marks the home page as the canonical profile for the person, which is what
 * Google looks for when deciding whether a site represents an individual. */
export const profilePageSchema = {
  "@type": "ProfilePage",
  "@id": `${siteUrl}/#profile`,
  url: siteUrl,
  name: siteName,
  isPartOf: { "@id": `${siteUrl}/#website` },
  about: { "@id": `${siteUrl}/#person` },
  inLanguage: "en",
};

/** Drives the FAQ rich result — the questions are already rendered on the
 * page, which is what Google requires for eligibility. */
export const faqSchema = {
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  };
}

/** One JSON-LD block per page, with every node in a single @graph so the
 * @id cross-references between them resolve. */
export function JsonLd({ schemas }: { schemas: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schemas,
        }),
      }}
    />
  );
}
