import type { Metadata } from "next";
import { Public_Sans, PT_Serif } from "next/font/google";
import "./globals.css";
import {
  isIndexable,
  person,
  siteDescription,
  siteKeywords,
  siteName,
  siteUrl,
} from "@/lib/site";
import { JsonLd, personSchema, websiteSchema } from "@/lib/schema";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    // Every inner page still carries the name, which is what a name search
    // matches against.
    template: "%s — Anmol Rajput",
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  publisher: person.name,
  applicationName: siteName,
  alternates: { canonical: "/" },
  category: "technology",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: person.name,
    title: siteName,
    description: siteDescription,
    locale: "en_US",
  },
  // No title/description here on purpose: Next fills them from each page's own
  // metadata. Pinning them at the root made every post share the home page's
  // card.
  twitter: { card: "summary_large_image" },
  robots: {
    index: isIndexable,
    follow: isIndexable,
    googleBot: {
      index: isIndexable,
      follow: isIndexable,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The attribute tells Next the smooth scrolling in globals.css is
    // deliberate, so it can suppress it during route changes — without it a
    // navigation animates the scroll to top instead of jumping.
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Runs before anything else, so the browser never queues a scroll
            restore in the first place — a refresh belongs at the hero.
            SmoothScroll holds the line afterwards for Safari, which likes to
            re-apply its remembered offset once images settle the height. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if('scrollRestoration' in history)history.scrollRestoration='manual';if(!location.hash)window.scrollTo(0,0)}catch(e){}`,
          }}
        />
        <JsonLd schemas={[personSchema, websiteSchema]} />
        {/* Reveals are hidden until observed; without JS, show everything. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${publicSans.variable} ${ptSerif.variable}`}>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-[96px] bg-ink px-5 py-3 text-[14px] font-medium text-white transition-transform duration-300 focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
