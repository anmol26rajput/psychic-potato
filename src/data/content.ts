/**
 * All copy in this file is PLACEHOLDER content written for this clone — it is
 * not copied from the original Framer template. Swap it for real content;
 * anything under `placeholder: true` should be replaced before shipping.
 */

export const nav = {
  logoLabel: "A",
  links: [
    { index: "01", label: "Works", href: "/#works" },
    { index: "02", label: "Services", href: "/#services" },
    { index: "03", label: "About", href: "/#about" },
    { index: "04", label: "Blog", href: "/blog" },
    { index: "05", label: "Contact", href: "/#contact" },
  ],
  email: "anmol26rajput@gmail.com",
};

export type HeroBackgroundEffectId = "water-wave" | "gridwave" | "light-tunnel";

export const hero = {
  /** Switches the hero's background effect — see docs/AUDIT.md §8: the
   * source template links this exact list ("Water Wave / Gridwave / Light
   * Tunnel") to three demo pages, each with a different hero background. */
  backgroundEffects: [
    { id: "water-wave" as HeroBackgroundEffectId, label: "Water Wave" },
    { id: "gridwave" as HeroBackgroundEffectId, label: "Gridwave" },
    { id: "light-tunnel" as HeroBackgroundEffectId, label: "Light Tunnel" },
  ],
  wordmark: "ANMOL",
  greeting: "Hi, I'm",
  firstName: "Anmol",
  /** Cycles under the greeting — the template rotates one line at a time. */
  roles: [
    "Backend Engineering",
    "Django & Python",
    "AI Agents & Automation",
    "Full-Stack Delivery",
    "Freelance, End to End",
  ],
  scrollCue: "✦ SCROLL DOWN ✦ AND KNOW ME BETTER",
  socialProof: "Trusted by 20+ clients, 2+ years of experience.",
  description:
    "I build scalable backend systems and AI-powered applications with Python and Django. From secure production APIs to NLP tools, I turn complex problems into reliable, production-ready software.",
  cta: { label: "Start a Project", href: "#contact" },
  available: true,
};

export const works = [
  {
    name: "Dellure",
    industry: ["E-Commerce", "Fashion & Apparel"],
    services: ["Shopify Development", "Store Design & Optimization"],
    year: "2026",
    image: "https://dellure.com/cdn/shop/t/4/assets/dl-about-3.jpg",
    logo: "https://dellure.com/cdn/shop/files/dellure_whole_logo.png?width=600",
    // The wordmark is near-black on transparent — flipped to read on the dark card.
    invertLogo: true,
    url: "https://dellure.com",
  },
  {
    name: "Learn Beyond Horizon",
    industry: ["Education", "Language Learning"],
    services: ["Full-Stack Development", "Web Design"],
    year: "2026",
    image: "https://www.learnbeyondhorizon.com/logo-mark.webp",
    logo: "https://www.learnbeyondhorizon.com/logo-mark.webp",
    url: "https://www.learnbeyondhorizon.com",
  },
  {
    name: "Sarva",
    industry: ["Productivity", "SaaS"],
    services: ["Full-Stack Development", "Privacy-First Tooling"],
    year: "2026",
    image: "/work/sarva.png",
    logo: "/work/logos/sarva.svg",
    url: "https://www.sarva-editor.com",
  },
  {
    name: "CommHawk",
    industry: ["Technology", "Digital Agency"],
    services: ["Full-Stack Development", "Web Design"],
    year: "2026",
    image: "/work/commhawk.png",
    logo: "/work/logos/commhawk.png",
    url: "https://commhawk.vercel.app",
  },
  {
    name: "anmolrajput.com",
    industry: ["Portfolio", "Personal Site"],
    services: ["Design & Development", "SEO"],
    year: "2026",
    // Headless-Chrome capture of the live site at 16:10, the card's aspect.
    image: "/work/portfolio.jpg",
    url: "https://anmol-rajput.vercel.app",
  },
] satisfies Array<{
  name: string;
  industry: string[];
  services: string[];
  year: string;
  image: string;
  /** Only the brand rail renders these, so a project without one is fine. */
  logo?: string;
  invertLogo?: boolean;
  url?: string;
}>;

/** Projects pulled from github.com/anmol26rajput. These aren't deployed yet,
 * so each links to its source repo for now — swap in live URLs as they ship. */
export const otherWorks = [
  {
    name: "Django ML App",
    industry: "Machine Learning",
    description: "A Django app that serves live predictions from a trained machine learning model.",
    year: "2025",
    url: "https://github.com/anmol26rajput/Django-ML-App" as string | undefined,
  },
  {
    name: "Django Authentication",
    industry: "Web Security",
    description: "A complete auth system in Django — sign-up, login, sessions, and protected routes.",
    year: "2025",
    url: "https://github.com/anmol26rajput/Django-Authentication" as string | undefined,
  },
  {
    name: "Simple Poll App",
    industry: "Web App",
    description: "A Django polling app where users create questions and cast votes.",
    year: "2024",
    url: "https://github.com/anmol26rajput/Simple-Poll-App" as string | undefined,
  },
  {
    name: "Text ⇄ Speech Converter",
    industry: "AI Tools",
    description: "A Python tool for two-way conversion between text and speech.",
    year: "2023",
    url: "https://github.com/anmol26rajput/Text-To-Speech-Speech-To-Text-Conversion" as string | undefined,
  },
  {
    name: "Voice Assistant",
    industry: "AI Tools",
    description: "A Python voice assistant that responds to spoken commands.",
    year: "2023",
    url: "https://github.com/anmol26rajput/minchu.ipynb" as string | undefined,
  },
  {
    name: "House Price Prediction",
    industry: "Data Science",
    description: "A regression model that predicts house prices from property features.",
    year: "2023",
    url: "https://github.com/anmol26rajput/House-Price-Prediction" as string | undefined,
  },
  {
    name: "SMS Spam Detection",
    industry: "Machine Learning",
    description: "An NLP classifier that flags spam SMS messages from their text.",
    year: "2023",
    url: "https://github.com/anmol26rajput/SMS-Spam-Detection" as string | undefined,
  },
  {
    name: "G20 News Hub",
    industry: "Web App",
    description: "A React app aggregating news headlines around the G20 summit.",
    year: "2023",
    url: "https://github.com/anmol26rajput/G20NewsHub" as string | undefined,
  },
  {
    name: "Java Projects",
    industry: "Software",
    description: "A collection of Java programs and mini-projects covering core concepts.",
    year: "2023",
    url: "https://github.com/anmol26rajput/Java-projects" as string | undefined,
  },
  {
    name: "CipherByte Internship",
    industry: "Internship",
    description: "Projects built during the CipherByte Technologies internship program.",
    year: "2023",
    url: "https://github.com/anmol26rajput/CBTCIP" as string | undefined,
  },
];

export const services = [
  {
    index: "01",
    name: "Backend Development",
    description:
      "I design and build scalable backend systems with Python and Django, from REST APIs to secure authentication and database architecture that holds up under real production traffic.",
    offerings: [
      "Django REST APIs",
      "Database Design",
      "Authentication & Security",
      "Payment Gateway Integration",
      "Performance Optimization",
    ],
  },
  {
    index: "02",
    name: "AI & Machine Learning",
    description:
      "I build practical AI features, from NLP pipelines to predictive models, and integrate them into real products using OpenAI and traditional ML tooling.",
    offerings: [
      "NLP & Text Processing",
      "Predictive Modeling",
      "OpenAI API Integration",
      "Model Deployment",
      "Data Analysis & Visualization",
    ],
  },
  {
    index: "03",
    name: "AI Agents & Automation",
    description:
      "I build agents that do the work rather than just answer questions, wiring the Claude API into your own tools and data so they can take real actions and hand back something you can ship.",
    offerings: [
      "Claude API Integration",
      "Tool-Calling Agents",
      "Document Q&A (RAG)",
      "Workflow Automation",
      "Prompt & Context Design",
    ],
  },
  {
    index: "04",
    name: "Full-Stack Development",
    description:
      "I ship complete products end to end, Next.js on the frontend and Django on the backend, deployed and monitored so nothing gets stuck between design and production.",
    offerings: [
      "Next.js Frontend",
      "REST API Integration",
      "Cloud Deployment (AWS)",
      "CI/CD Basics",
      "Post-Launch Support",
    ],
  },
  {
    index: "05",
    name: "Portfolio Websites",
    description:
      "I craft personal and studio portfolios that make first impressions count, fast, animated, and built to convert visitors into clients or recruiters.",
    offerings: [
      "Custom Design & Branding",
      "Smooth Motion & Interactions",
      "SEO & Social Previews",
      "Blazing-Fast Load Times",
      "One-Click Content Updates",
    ],
  },
  {
    index: "06",
    name: "Business Websites",
    description:
      "I build marketing and business sites that turn a company's story into a clean, responsive experience, from landing pages to full multi-page sites, wired for growth.",
    offerings: [
      "Landing & Multi-Page Sites",
      "Responsive on Every Device",
      "CMS & Easy Editing",
      "Contact & Lead Forms",
      "Analytics Setup",
    ],
  },
  {
    index: "07",
    name: "E-Commerce Stores",
    description:
      "I develop online stores that make buying effortless, secure checkout, product management, and payment gateways integrated so you can sell from day one.",
    offerings: [
      "Storefront & Cart",
      "Stripe / Razorpay Checkout",
      "Inventory & Orders",
      "Coupons & Discounts",
      "Order Notifications",
    ],
  },
];

export const process = [
  {
    step: "S1",
    title: "Discover the Essence that drives your brand",
    description:
      "I begin by clarifying your goals, audience, and market fit. The insights set a clear direction and define what success means for you.",
  },
  {
    step: "S2",
    title: "Design Bold Ideas",
    description:
      "Concepts are pushed further than the obvious, then refined against real constraints until the direction feels inevitable.",
  },
  {
    step: "S3",
    title: "Deliver with Speed",
    description:
      "Production moves fast without cutting corners. Every build is shipped, tested, and handed off ready to grow.",
  },
];

export const about = {
  heading:
    "I'm Anmol Rajput, a freelance developer who builds websites, portfolios, e-commerce stores, and scalable backends for clients worldwide, handling everything from the first call to the final deploy. Alongside freelancing, I bring professional experience from roles across DRDO, Microsoft, Intel, and Google Developer Student Clubs.",
  approach: [
    {
      title: "One point of contact",
      description:
        "You talk to me directly, no account managers or middlemen. I scope the work, set clear milestones, and keep you updated at every step.",
    },
    {
      title: "End to end ownership",
      description:
        "From design and development to hosting, domains, and deployment, I manage the full stack so you never have to chase separate people.",
    },
    {
      title: "Transparent timelines",
      description:
        "Fixed scope, honest estimates, and regular check-ins. You always know what's shipping next and when it lands.",
    },
    {
      title: "Support after launch",
      description:
        "I don't disappear at handoff. Bug fixes, tweaks, and follow-up work are part of how I keep projects healthy.",
    },
  ],
  experience: [
    { role: "Back End Developer at White Light IT Solutions LLC", period: "Apr 2025 - Present" },
    { role: "Research Intern at DRDO, Ministry of Defence", period: "Sep 2023 - Dec 2023" },
    { role: "Software Engineer Intern at CipherByte Technologies", period: "Aug 2023 - Sep 2023" },
    { role: "AI/ML Intern at Microsoft", period: "Jun 2023" },
    { role: "ML Trainee at Google Developer Student Clubs", period: "Jan 2023 - Feb 2023" },
    { role: "Project Intern at Microsoft Learn Student Ambassadors", period: "Jan 2023" },
    { role: "Student Intern at Intel Corporation", period: "Nov 2022 - Dec 2022" },
  ],
};

/** Tech stack shown in the "My Stack" flip-card grid. `icon` is a devicon
 * path served from jsDelivr — swap for local files in /public/tools if you'd
 * rather not depend on the CDN at runtime. `blurb` is the card's back face. */
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
export const tools = [
  {
    name: "Python",
    icon: `${DEVICON}/python/python-original.svg`,
    blurb:
      "The language I reach for first. Backends, data work, automation scripts — most of what I ship starts as Python.",
  },
  {
    name: "Django",
    icon: `${DEVICON}/django/django-plain.svg`,
    blurb:
      "Auth, migrations, an ORM, and a real admin on day one. When a project has a deadline, Django has already solved the boring half.",
  },
  {
    name: "FastAPI",
    icon: `${DEVICON}/fastapi/fastapi-original.svg`,
    blurb:
      "My choice when the job is a handful of typed endpoints wrapping a model rather than a full application.",
  },
  {
    name: "JavaScript",
    icon: `${DEVICON}/javascript/javascript-original.svg`,
    blurb:
      "The glue on the client side — interactions, browser APIs, and everything that has to happen after the page loads.",
  },
  {
    name: "TypeScript",
    icon: `${DEVICON}/typescript/typescript-original.svg`,
    blurb:
      "Types across the frontend so refactors stay boring. Every React project I hand off is typed end to end.",
  },
  {
    name: "React",
    icon: `${DEVICON}/react/react-original.svg`,
    blurb:
      "Component model I build every interface on, from marketing pages to dashboards clients use daily.",
  },
  {
    name: "Next.js",
    icon: `${DEVICON}/nextjs/nextjs-original.svg`,
    blurb:
      "Server rendering, routing, and image handling out of the box. This site runs on it.",
  },
  {
    name: "Node.js",
    icon: `${DEVICON}/nodejs/nodejs-original.svg`,
    blurb:
      "Runtime for the build tooling and the API layers that live next to the frontend instead of behind it.",
  },
  {
    name: "PostgreSQL",
    icon: `${DEVICON}/postgresql/postgresql-original.svg`,
    blurb:
      "My default database. Constraints in the schema catch bugs the application layer never will.",
  },
  {
    name: "Tailwind CSS",
    icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg`,
    blurb:
      "Design tokens that live in the markup, so spacing and colour stay consistent without a stylesheet to police.",
  },
  {
    name: "Docker",
    icon: `${DEVICON}/docker/docker-original.svg`,
    blurb:
      "The same environment on my laptop and on the server, which removes an entire category of deploy-day surprises.",
  },
  {
    name: "Kubernetes",
    icon: `${DEVICON}/kubernetes/kubernetes-original.svg`,
    blurb:
      "For the projects that outgrow a single box — rollouts, health checks, and scaling without hand-held restarts.",
  },
  {
    name: "AWS",
    icon: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
    blurb:
      "Where most of my client work is hosted. Compute, storage, and databases, sized to what the project actually needs.",
  },
  {
    name: "Git",
    icon: `${DEVICON}/git/git-original.svg`,
    blurb:
      "Reviewable history on every project. It's also how clients get a codebase they can hand to anyone later.",
  },
  // Not in devicon — cdn.simpleicons.org serves these marks in brand colour.
  {
    name: "Shopify Liquid",
    icon: "https://cdn.simpleicons.org/shopify",
    blurb:
      "Custom storefront themes and sections, built so the client can keep editing products without calling me.",
  },
  {
    name: "Claude API",
    icon: "https://cdn.simpleicons.org/anthropic",
    blurb:
      "Tool-calling agents wired into real systems, so the model takes actions instead of just describing them.",
  },
  {
    name: "NumPy",
    icon: `${DEVICON}/numpy/numpy-original.svg`,
    blurb:
      "Array maths underneath every model and data pipeline I've built. Fast, and it never gets in the way.",
  },
  {
    name: "Pandas",
    icon: `${DEVICON}/pandas/pandas-original.svg`,
    blurb:
      "How I get from a messy CSV to something a model can train on, or a client can read.",
  },
  {
    name: "TensorFlow",
    icon: `${DEVICON}/tensorflow/tensorflow-original.svg`,
    blurb:
      "Deep-learning work from my research and internship projects, including deployment behind a real API.",
  },
  {
    name: "PyTorch",
    icon: `${DEVICON}/pytorch/pytorch-original.svg`,
    blurb:
      "The framework I prototype models in when the architecture is still moving.",
  },
  {
    name: "scikit-learn",
    icon: `${DEVICON}/scikitlearn/scikitlearn-original.svg`,
    blurb:
      "Classical ML that solves more client problems than people expect — classification, regression, and honest baselines.",
  },
];

export const brands: { name: string; url: string; logo?: string; favicon?: boolean }[] = [
  { name: "Dellure", url: "https://dellure.com", logo: "https://dellure.com/cdn/shop/files/dellure_whole_logo.png?width=300" },
  { name: "Learn Beyond Horizon", url: "https://www.learnbeyondhorizon.com", logo: "https://www.learnbeyondhorizon.com/logo-mark.webp" },
  { name: "Sarva", url: "https://www.sarva-editor.com", logo: "/work/logos/sarva.svg" },
  { name: "CommHawk", url: "https://commhawk.vercel.app", logo: "/work/logos/commhawk.png" },
  { name: "Mindful", url: "#" },
  { name: "AV Tech and Services", url: "https://avtechandservices.com", logo: "/brands/av-tech.jpg" },
  { name: "DRDO", url: "https://drdo.gov.in/drdo/en/", logo: "/brands/drdo.jpg" },
  { name: "CipherByte Technologies", url: "https://www.cipherbytetechnologies.com", logo: "/brands/cipherbyte.jpg" },
  { name: "Microsoft", url: "https://www.microsoft.com/en-in", favicon: true },
  { name: "Microsoft Learn Ambassadors", url: "https://mvp.microsoft.com/studentambassadors", favicon: true },
  { name: "Google Developer Student Clubs", url: "https://sites.google.com/view/gdsc-algiers/about-us", favicon: true },
  { name: "Intel", url: "https://www.intel.com", favicon: true },
];

export type Testimonial = {
  /** The client's own words. Quote marks are added by the component. */
  quote: string;
  name: string;
  /** Role and company, e.g. "Founder, Dellure". */
  role: string;
  /** Optional link to the client's site. */
  url?: string;
};

/** Real client feedback only. The section does not render while this is
 * empty, so nothing invented ever reaches the page. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "I got my website developed by Mr. Anmol, and I must say he is exceptionally skilled developer. He catered my vision for the website and stayed really patient throughout the process. I highly recommend his work and skills.",
    name: "Preksha Jain",
    role: "Learn Beyond Horizon",
    url: "https://www.learnbeyondhorizon.com",
  },
];

/** Drafts written for real clients to approve, not published feedback: this
 * array is never rendered. Send one to the client it was written about, let
 * them cut it, reword it or say no, then move the approved version into
 * `testimonials` above with their real name and title. */
export const testimonialDrafts: Testimonial[] = [
  {
    quote:
      "We came to Anmol with a Shopify store that looked fine and sold badly. He went through it page by page, showed us what was slowing people down, and rebuilt the parts that mattered. Checkout is quicker now and we stopped losing people on mobile.",
    name: "Harsh Jain",
    role: "Founder, Dellure",
    url: "https://dellure.com",
  },
  {
    quote:
      "What I appreciated most was how little I had to chase him. Every few days there was a link I could open and click through myself, so nothing came as a surprise at the end. The site went live on the date we agreed, which honestly was not what I expected.",
    name: "",
    role: "SM Tech, CommHawk",
    url: "https://commhawk.vercel.app",
  },
  {
    quote:
      "Our API was falling over whenever traffic spiked and we had no idea why. He found the queries that were doing the damage, fixed them, and left us with notes explaining what he changed so our own team could keep up. Two months on it has not gone down once.",
    name: "",
    role: "Backend and API work",
  },
  {
    quote:
      "He built us an automation that handles the enquiries we used to answer by hand, and it now saves my team most of a day every week. He also stayed around after launch to fix the small things we only noticed once real customers were using it.",
    name: "",
    role: "AI and automation work",
  },
  {
    quote:
      "Different time zones, and it still felt easy. I would send questions at night and there would be a proper answer waiting in the morning, never a one line reply that left me guessing. I have already recommended him to two other people.",
    name: "",
    role: "Freelance client",
  },
];

export const faq = [
  {
    question: "How long does a project usually take?",
    answer: "Projects typically take around 3–6 weeks depending on scope and feedback.",
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, I work fully remote and I'm comfortable coordinating across time zones.",
  },
  {
    question: "Do you work on both backend and frontend?",
    answer: "Yes, Django and Python on the backend, Next.js on the frontend, end to end.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "It depends on scope. Reach out through the contact form or email and I'll get back to you with a quote.",
  },
  {
    question: "Do you provide support after launch?",
    answer: "Yes, I stick around for bug fixes and follow-up work after a project ships.",
  },
];

export const contact = {
  interests: [
    "Backend Development",
    "AI Agents & Automation",
    "AI/ML Integration",
    "Full-Stack Web App",
    "Portfolio Website",
    "Business Website",
    "E-Commerce Store",
  ],
  email: "anmol26rajput@gmail.com",
};

export const footer = {
  sitemap: [
    { label: "About", href: "/#about" },
    { label: "Works", href: "/#works" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/#contact" },
    { label: "Other Work", href: "/work" },
    { label: "Blog", href: "/blog" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/anmol26rajput" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anmol-rajput-b31061229/" },
    { label: "Medium", href: "https://medium.com/@anmol26rajput" },
  ],
  wordmark: "ANMOL RAJPUT'S PORTFOLIO",
};
