# psychic-potato

Anmol Rajput's portfolio — the content from the previous site, rebuilt on the
[Cohesion](https://cohesion.framer.ai/) layout: white ground, indigo `#6670FF`
primary, one orange accent, 48px panels, 96px pills, Public Sans with PT Serif
italic for the accent words.

```bash
npm run dev
```

## Where things live

| Path | What |
| --- | --- |
| `src/data/content.ts` | Every piece of site copy — hero, works, services, tools, brands, testimonials, FAQ, footer |
| `src/data/posts.ts` | Blog posts. `## ` starts a subheading, `*word*` emphasises |
| `src/lib/site.ts` | Canonical origin, name, description, keywords — the SEO source of truth |
| `src/lib/schema.tsx` | JSON-LD graph (Person, WebSite, ProfilePage, FAQPage, BlogPosting, Breadcrumb) |
| `src/app/globals.css` | Design tokens (`@theme`), the `panel` / `card` / `btn` shells, and every animation |
| `src/components/` | One file per section, composed in `src/app/page.tsx` |

Editing the site is mostly editing `content.ts`.

## Deploying to www.anmolrajput.com

The site is a plain Next.js app with no server dependencies, no database and no
environment variables — a new Vercel project needs nothing configured beyond
the domain.

1. Push this repo to GitHub, then import it as a **new Vercel project**.
   Framework preset, build command and output directory are all detected; leave
   them alone.
2. In the new project, add the domain `www.anmolrajput.com` and set
   `anmolrajput.com` to redirect to it. That matches the current live setup
   (apex already 308s to `www`) and matches `siteUrl` in `src/lib/site.ts`.
3. Remove the domain from the old project **first** — Vercel will not attach it
   to two projects at once.
4. After the DNS swap, re-submit `https://www.anmolrajput.com/sitemap.xml` in
   Google Search Console.

### URL parity with the old site

Every URL the old site had exists here with the same path, so no redirects are
needed and nothing already indexed will 404:

```
/                                              /blog/why-django-still-wins-for-shipping-fast
/work                                          /blog/what-makes-an-ai-agent-actually-useful
/blog                                          /blog/how-i-run-a-freelance-project
```

If a post slug ever changes, add a redirect in `next.config.ts` rather than
letting the old URL 404.

## Notes

- **Preview deployments are not indexed.** `isIndexable` in `src/lib/site.ts`
  keys off `VERCEL_ENV`, so `*.vercel.app` preview builds serve
  `Disallow: /` and a `noindex` robots meta. Production and local builds index
  normally.
- Entrance animations are CSS + `IntersectionObserver` (`Reveal.tsx`), not an
  animation library, so they survive a backgrounded tab. A `<noscript>` block in
  the layout un-hides everything when JS never runs.
- Lenis provides the inertial scroll. `NEXT_PUBLIC_NO_LENIS=1` falls back to
  native scrolling, which screenshot tooling needs.
- The contact form has no backend: it composes a `mailto:` draft.
- `testimonials` in `content.ts` is empty and the section hides itself until
  real client feedback is added — nothing invented ever renders.
- Brand logos and stack icons come from CDNs; hosts are allowlisted in
  `next.config.ts`.
- OG images for the home page and each post are generated at build time by
  `opengraph-image.tsx`.
