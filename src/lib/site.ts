/** Canonical origin for the deployed site — the single source of truth for
 * metadata, canonical URLs, robots, and the sitemap. Change it here when the
 * site moves to a custom domain. No trailing slash. */
export const siteUrl = "https://www.anmolrajput.com";

/** A new Vercel project also serves the site on its own *.vercel.app aliases.
 * Those are byte-identical duplicates of the real domain, so everything but
 * the production deployment is kept out of the index. Undefined locally, which
 * is treated as production so local builds match what ships. */
export const isIndexable = process.env.VERCEL_ENV !== "preview";

export const siteName = "Anmol Rajput — Backend & AI Developer";

/** Leads with the full name: this is the snippet Google shows for a search on
 * "Anmol Rajput", so the name has to be the first thing in it. */
export const siteDescription =
  "Anmol Rajput is a freelance software developer building scalable backend systems and AI-powered applications with Python, Django, and Next.js. Previously at DRDO, Microsoft, and Intel.";

/** Google ignores the keywords meta tag; this exists for the other engines
 * and to keep the vocabulary in one place for titles and copy. */
export const siteKeywords = [
  "Anmol Rajput",
  "Anmol Rajput developer",
  "Anmol Rajput portfolio",
  "Anmol Rajput backend developer",
  "Anmol Rajput freelance developer",
  "backend developer",
  "Python developer",
  "Django developer",
  "FastAPI developer",
  "Next.js developer",
  "full-stack developer",
  // One term per service in `services` — these are the pages' actual offers.
  "AI agent developer",
  "AI automation developer",
  "machine learning developer",
  "Shopify store developer",
  "portfolio website developer",
  "business website developer",
  "freelance developer India",
  "hire freelance backend developer",
];

export const person = {
  name: "Anmol Rajput",
  givenName: "Anmol",
  familyName: "Rajput",
  jobTitle: "Backend & AI Developer",
  /** Shown in Person schema; keep in sync with the About section. */
  worksFor: "White Light IT Solutions LLC",
  nationality: "IN",
  addressCountry: "IN",
};
