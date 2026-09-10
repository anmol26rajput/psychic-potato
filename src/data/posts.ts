/** Blog posts. Each entry becomes a statically-rendered route at
 * /blog/<slug> and a sitemap entry — no CMS, no markdown dependency.
 *
 * `body` is a list of blocks: a line starting with "## " renders as a
 * subheading, anything else renders as a paragraph. */
export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date. Drives the displayed date, the sitemap lastModified, and
   * `datePublished` in the BlogPosting schema — keep it YYYY-MM-DD. */
  date: string;
  body: string[];
};

/** Sorted newest-first here so the index page and the sitemap can't drift. */
export const posts: Post[] = [
  {
    slug: "why-django-still-wins-for-shipping-fast",
    title: "Why I Still Reach for Django When a Project Has to Ship",
    description:
      "Admin, auth, migrations, and an ORM that survives contact with real data. The case for boring backend choices when the deadline is real.",
    date: "2026-08-18",
    body: [
      "Every few months a client asks why I'm not building their backend on whatever framework is currently on the front page of Hacker News. It's a fair question, and my answer is usually the same: because the project has a deadline, and Django has already solved the six things that would otherwise eat my first two weeks.",
      "Authentication is the clearest example. A new project needs signup, login, password reset, session handling, and permissions before it does anything a user would pay for. In Django that's an afternoon. Everywhere else it's a decision tree. Which auth library, which session strategy, how to hash, where to put the reset tokens. Every branch of that tree is a place to get security subtly wrong.",
      "## The admin is a real feature, not a demo",
      "The Django admin gets dismissed as a toy, and that's a mistake. On most of the projects I've delivered, the admin *is* the internal tool. The client needs to correct an order, refund a payment, or fix a typo in a product description, and they need to do it without messaging me. Handing them a working admin on day three changes the entire shape of the engagement, because I stop being a bottleneck for routine data edits.",
      "It also gives me a place to look when something breaks in production. Before I open a shell, I can see the actual rows involved in whatever the client is describing.",
      "## Migrations are the part people underrate",
      "Schema changes are where side projects go to die. Django's migration system isn't glamorous, but it gives you a reviewable, ordered, reversible record of how the database got to its current shape, and it works the same on my laptop as it does on the server. When a deploy goes wrong at 11pm, knowing exactly which migration ran and how to unwind it is worth more than any performance benchmark.",
      "## Where I don't use it",
      "None of this makes Django universal. If the job is a handful of endpoints wrapping a model, FastAPI is a smaller, sharper tool and I'll use it. If the product is mostly rendering and the data layer is thin, Next.js on its own is plenty. This site is exactly that.",
      "The point isn't that one framework wins. It's that on a fixed budget with a real launch date, the framework that has already made the boring decisions for you is usually the one that gets you there. Novelty is a cost, and it's a cost the client pays.",
    ],
  },
  {
    slug: "what-makes-an-ai-agent-actually-useful",
    title: "What Actually Makes an AI Agent Useful",
    description:
      "Most agent demos answer questions. The ones worth building take actions, which means the hard part is tools and context, not prompts.",
    date: "2026-07-29",
    body: [
      "There's a wide gap between an AI demo and an AI feature someone uses on a Tuesday. I've built on both sides of it, and the difference almost never comes down to the model or the prompt. It comes down to whether the thing can actually do the job or just describe it.",
      "A chatbot that explains how to issue a refund is a worse product than a button. An agent that issues the refund is a product: it checks the order, confirms the amount, calls the payment API, and writes the record. The moment you cross from answering to acting, the engineering problem changes completely.",
      "## Tools are the product surface",
      "When I build an agent, most of the work is in the tool definitions: what the model is allowed to call, what each call needs, and what it gets back. This is ordinary API design, with one twist. The caller is a model reading your descriptions, so vague parameter names and missing constraints turn into wrong actions rather than type errors.",
      "The rule I've settled on: every tool should be safe to call with any input the model could plausibly produce. Validate inside the tool, not in the prompt. A prompt is a suggestion; a check in your own code is a guarantee.",
      "## Context beats cleverness",
      "The second half of the work is getting the right information in front of the model at the right time. Retrieval over a client's documents, the current state of the record being edited, what the user already said. Teams reach for elaborate prompt engineering when the real problem is that the model simply wasn't given the one fact it needed.",
      "This is unglamorous plumbing, and it's where the quality actually comes from. A modest model with the right context and well-built tools beats a frontier model guessing.",
      "## Decide what it can't do",
      "The last piece is the boundary. Which actions run automatically, and which stop and ask a human first? Anything that moves money, sends a message on someone's behalf, or deletes data belongs in the second category until the client explicitly says otherwise. Agents are good at doing things quickly, including the wrong things, and the cost of a confirmation step is far lower than the cost of an unwanted action at scale.",
      "Get the tools, the context, and the boundary right and the agent is genuinely useful. Skip them and you've built a slower search box.",
    ],
  },
  {
    slug: "how-i-run-a-freelance-project",
    title: "How I Run a Freelance Project, From First Call to Deploy",
    description:
      "Scope, milestones, and what happens after launch. The process I use so clients always know what's shipping next.",
    date: "2026-06-24",
    body: [
      "Most freelance projects that go badly don't fail technically. They fail because nobody agreed on what 'done' meant, and the disagreement surfaced two weeks after it was expensive to fix. Here's the process I use to keep that from happening.",
      "## The first call is scoping, not selling",
      "I spend the first conversation trying to find the smallest version of the project that's still worth building. Clients usually arrive with a feature list, and a good chunk of it is speculative: things they think they'll want, based on a version of the business that doesn't exist yet. Cutting those before we start is the single cheapest thing we can do together.",
      "What I want out of that call is a clear picture of who uses this, what they do with it, and what has to be true on launch day. Everything else becomes a later phase.",
      "## Milestones the client can actually see",
      "I break the work into milestones that produce something visible, not internal ones like 'set up the database'. A client can't evaluate a schema, but they can evaluate a working signup flow, a product page with real data, or an admin they can log into. Each milestone is something they can open in a browser and react to.",
      "That structure catches misunderstandings early. If I built the wrong thing, I find out at the end of a milestone instead of at the end of a project.",
      "## One point of contact, in both directions",
      "I work directly with clients, with no account manager relaying requirements through a second person. It works because it also runs the other way: I need one person on their side who can make decisions. Feedback from four people with different opinions and no tiebreaker is how a two-week milestone turns into six.",
      "## Launch is the middle, not the end",
      "Handoff includes hosting, domains, and deployment, because the alternative is a client holding a codebase they can't run. After launch there's always a tail: a bug under real traffic, a copy change, something that only shows up once actual users arrive. I plan for that tail rather than treating it as an interruption.",
      "None of this is complicated. It's mostly just deciding things early, in writing, with someone who has the authority to decide them.",
    ],
  },
].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

/** Pinned to UTC so the statically-rendered string matches on hydration
 * regardless of the visitor's timezone. */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
