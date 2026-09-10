import Link from "next/link";
import { contact, footer } from "@/data/content";
import HoverTip from "./HoverTip";

/** Each link carries the copy for its own hover pill, phrased for what the
 * link actually does rather than a generic "click here". */
const columns = [
  {
    title: "Contact Me",
    items: [
      { label: "Book a Call", href: "/#contact", tip: "Book a Free Call" },
      {
        label: contact.email,
        href: `mailto:${contact.email}`,
        tip: "Send Me an Email",
      },
    ],
  },
  {
    title: "Useful Links",
    items: footer.sitemap.map((item) => ({
      ...item,
      tip: `Go to ${item.label}`,
    })),
  },
  {
    title: "Social",
    items: footer.socials.map((item) => ({
      ...item,
      tip: `Visit My ${item.label} Profile`,
    })),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-16 md:pt-20">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[15px] font-bold">{column.title}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {column.items.map((item) => {
                  const external =
                    item.href.startsWith("http") || item.href.startsWith("mailto:");
                  return (
                    <li key={item.label}>
                      <HoverTip label={item.tip}>
                        {external ? (
                          <a
                            href={item.href}
                            target={
                              item.href.startsWith("http") ? "_blank" : undefined
                            }
                            rel="noopener noreferrer"
                            className="tap-target text-[14px] text-muted transition-colors hover:text-ink"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="tap-target text-[14px] text-muted transition-colors hover:text-ink"
                          >
                            {item.label}
                          </Link>
                        )}
                      </HoverTip>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 text-[14px] text-muted md:flex-row md:items-center md:justify-between">
          <p>© Copyright {new Date().getFullYear()}</p>
          <p>Built with Next.js</p>
        </div>
      </div>

      {/* Oversized wordmark clipped by the bottom edge, as in the reference. */}
      <p
        aria-hidden
        className="mt-8 select-none whitespace-nowrap text-center font-black leading-[0.75] tracking-[-0.03em] text-ink"
        style={{ fontSize: "13.2vw", marginBottom: "-0.19em" }}
      >
        ANMOL RAJPUT
      </p>
    </footer>
  );
}
