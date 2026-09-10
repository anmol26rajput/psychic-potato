"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "/#top", id: "top" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Stack", href: "/#stack", id: "stack" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Blog", href: "/blog", id: "blog" },
];

export default function Nav() {
  const pathname = usePathname();
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);

  /** Scroll spy: the section whose top has most recently passed the upper
   * third of the viewport wins. Only runs on the one page that has sections. */
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = links.filter((l) => l.id !== "blog").map((l) => l.id);
    const onScroll = () => {
      const line = window.innerHeight / 3;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isActive = (id: string) =>
    pathname.startsWith("/blog") ? id === "blog" : pathname === "/" && id === active;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[18px]">
      <nav className="container-x flex items-center justify-center gap-3">
        {/* Desktop pill cluster */}
        <div className="hidden items-center gap-0.5 rounded-[96px] border border-hair bg-white/75 p-[3px] shadow-[0_6px_24px_rgba(16,16,16,0.07)] backdrop-blur-[14px] md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-[96px] px-3.5 py-[7px] text-[13px] font-medium transition-colors duration-300 ${
                isActive(link.id)
                  ? "bg-orange text-white"
                  : "text-ink hover:bg-indigo-fill"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/#contact"
          className="hidden rounded-[96px] border border-hair bg-white/75 px-4 py-[10px] text-[13px] font-medium shadow-[0_6px_24px_rgba(16,16,16,0.07)] backdrop-blur-[14px] transition-colors duration-300 hover:bg-ink hover:text-white md:block"
        >
          Contact
        </Link>

        {/* Mobile */}
        <div className="flex w-full items-center justify-between rounded-[96px] border border-hair bg-white/80 py-2 pl-5 pr-2 shadow-[0_6px_24px_rgba(16,16,16,0.07)] backdrop-blur-[14px] md:hidden">
          <Link href="/" className="text-[14px] font-bold tracking-tight">
            ANMOL
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-[96px] bg-ink px-4 py-1.5 text-[13px] font-medium text-white"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="container-x mt-3 md:hidden">
          <div className="flex flex-col gap-1 rounded-[24px] border border-hair bg-white p-3 shadow-[0_8px_30px_rgba(16,16,16,0.08)]">
            {[...links, { label: "Contact", href: "/#contact", id: "contact" }].map(
              (link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[96px] px-5 py-2.5 text-[15px] font-medium hover:bg-indigo-fill"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}
