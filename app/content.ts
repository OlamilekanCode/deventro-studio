export const SITE_URL = "https://dev.deventro.site";
export const CONTACT_EMAIL = "support@deventro.site";
export const GITHUB_URL = "https://github.com/OlamilekanCode";
export const X_URL = "https://x.com/olamiltechlife";
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAERMoEacDOZDDdcO";

// Shown in the contact section and after a successful submission.
export const REPLY_TIME = "within 1–2 business days";

export type IconName = "layout" | "app" | "plug" | "spark";

export const services: {
  title: string;
  body: string;
  deliverables: string[];
  icon: IconName;
}[] = [
  {
    title: "Websites that win trust",
    body: "A fast, credible website that explains what you do and turns visitors into enquiries—built around your customers, not a template.",
    deliverables: ["Responsive design", "SEO foundations", "Editable content"],
    icon: "layout",
  },
  {
    title: "Custom web applications",
    body: "Dashboards, booking systems, portals and internal tools shaped around how your business actually runs.",
    deliverables: ["User accounts & roles", "Admin dashboards", "Reporting"],
    icon: "app",
  },
  {
    title: "APIs & integrations",
    body: "Secure backends that connect payments, authentication, databases and third-party services into one dependable system.",
    deliverables: ["REST APIs", "Payments & webhooks", "Auth & data security"],
    icon: "plug",
  },
  {
    title: "AI-enabled workflows",
    body: "Practical AI features and automations that take repetitive work off your team and keep information organised.",
    deliverables: ["AI assistants", "Document automation", "Workflow triggers"],
    icon: "spark",
  },
];

export const projects: {
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tech: string[];
  href?: string;
  linkLabel?: string;
}[] = [
  {
    title: "DevEntro",
    category: "Publishing platform",
    description:
      "A publishing and AI-tools discovery platform that lets an admin team write, organise and publish content without touching code.",
    highlights: [
      "Admin content workflows",
      "Media storage on Cloudflare R2",
      "Newsletter capture and SEO",
    ],
    tech: ["Next.js", "TypeScript", "Cloudflare D1/R2"],
    href: "https://deventro.site",
    linkLabel: "View live site",
  },
  {
    title: "Biometric Attendance",
    category: "Education",
    description:
      "A local-first attendance system for schools that replaces paper registers with fingerprint and QR check-in—and keeps working offline.",
    highlights: [
      "Fingerprint identification",
      "QR attendance",
      "Student records and reports",
    ],
    tech: ["React", "Node.js", "PostgreSQL", ".NET"],
    href: "https://github.com/OlamilekanCode/biometric-attendance-system",
    linkLabel: "View on GitHub",
  },
  {
    title: "TravelWorld",
    category: "Travel & booking",
    description:
      "A booking platform where customers reserve, review and cancel trips, with safeguards that prevent double-booking.",
    highlights: [
      "Authenticated reservation APIs",
      "Availability protection",
      "Booking history and cancellations",
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "REST APIs"],
  },
  {
    title: "ReqBug",
    category: "Developer tooling",
    description:
      "A disposable webhook inspector that helps developers capture, verify and safely replay webhook requests while building integrations.",
    highlights: [
      "Ephemeral endpoints",
      "Signature verification",
      "Safe request replay",
    ],
    tech: ["TypeScript", "Cloudflare Workers", "Webhooks"],
    href: "https://github.com/OlamilekanCode/ReqBug",
    linkLabel: "View on GitHub",
  },
];

export const processSteps = [
  {
    title: "Discover",
    body: "A short call to understand the problem, your users and what success looks like.",
    output: "You get: a written scope and quote",
  },
  {
    title: "Design",
    body: "Key screens and flows are mapped out before code, so we agree on the direction early.",
    output: "You get: a clickable prototype or wireframes",
  },
  {
    title: "Build",
    body: "Development happens in milestones, with a live preview link so you can see real progress.",
    output: "You get: regular demos and updates",
  },
  {
    title: "Launch",
    body: "Important journeys are tested, the product is deployed carefully and everything is handed over.",
    output: "You get: live product, source code and docs",
  },
];

export const principles = [
  "Lagos-based, working worldwide",
  "You work directly with the developer",
  "Milestone-based delivery",
  "You own the code",
];

export const faqs = [
  {
    question: "How much does a project cost?",
    answer:
      "It depends on scope. After a short discovery call you get a fixed quote for a clearly defined first version, so there are no surprises. The budget range in the form helps me suggest the right starting point.",
  },
  {
    question: "How long does it take?",
    answer:
      "A focused business website usually takes a few weeks; custom platforms take longer and are delivered in milestones. You get a realistic timeline with the quote.",
  },
  {
    question: "Do you work with clients outside Nigeria?",
    answer:
      "Yes. I work remotely with clients worldwide and keep communication asynchronous-friendly, with regular written updates and calls when they help.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do. At handoff you receive the source code, access to your hosting and accounts, and documentation so any developer can continue the work.",
  },
  {
    question: "Can you help after launch?",
    answer:
      "Yes. I offer ongoing support for fixes, improvements and new features—choose “Ongoing product support” in the form.",
  },
];

export const capabilities = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "NestJS",
  "FastAPI",
  "Laravel",
  "PostgreSQL",
  "MongoDB",
  "Cloudflare",
  "AI integrations",
];

export const projectTypes = [
  "Business website",
  "Custom web application",
  "API or integration",
  "AI-enabled workflow",
  "Ongoing product support",
];

export const timelines = [
  "As soon as possible",
  "Within 1 month",
  "1-3 months",
  "3+ months",
];

export const budgets = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $7,500",
  "$7,500+",
  "Not sure yet",
];

export function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}
