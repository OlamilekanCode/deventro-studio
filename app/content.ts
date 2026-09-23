export const SITE_URL = "https://dev.deventro.site";
export const CONTACT_EMAIL = "support@deventro.site";
export const GITHUB_URL = "https://github.com/OlamilekanCode";
export const X_URL = "https://x.com/olamiltechlife";
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAERMoEacDOZDDdcO";

export type IconName = "layout" | "app" | "plug" | "spark";

export const services: {
  title: string;
  body: string;
  icon: IconName;
}[] = [
  {
    title: "Websites that win trust",
    body: "Fast, responsive business websites and content platforms designed around a clear customer journey—not a generic template.",
    icon: "layout",
  },
  {
    title: "Custom web applications",
    body: "Dashboards, booking systems, portals, internal tools and full-stack products shaped around how your business actually works.",
    icon: "app",
  },
  {
    title: "APIs & integrations",
    body: "Secure backends, authentication, databases, payments, webhooks and third-party services connected into one dependable system.",
    icon: "plug",
  },
  {
    title: "AI-enabled workflows",
    body: "Practical AI features and automations that reduce repetitive work, organize information and help teams move faster.",
    icon: "spark",
  },
];

export const projects: {
  title: string;
  category: string;
  description: string;
  tech: string[];
  href?: string;
  linkLabel?: string;
}[] = [
  {
    title: "DevEntro",
    category: "Publishing platform",
    description:
      "An admin-managed publishing and AI-tools discovery platform with content workflows, media storage, newsletter capture and SEO infrastructure.",
    tech: ["Next.js", "TypeScript", "Cloudflare D1/R2"],
    href: "https://deventro.site",
    linkLabel: "View live site",
  },
  {
    title: "Biometric Attendance",
    category: "Education",
    description:
      "A local-first school attendance platform combining fingerprint identification, QR attendance, reporting and student management.",
    tech: ["React", "Node.js", "PostgreSQL", ".NET"],
    href: "https://github.com/OlamilekanCode/biometric-attendance-system",
    linkLabel: "View on GitHub",
  },
  {
    title: "TravelWorld",
    category: "Travel & booking",
    description:
      "A booking platform with authenticated reservation APIs, availability protection, customer booking history and cancellation flows.",
    tech: ["Next.js", "Node.js", "MongoDB", "REST APIs"],
  },
  {
    title: "ReqBug",
    category: "Developer tooling",
    description:
      "An ephemeral webhook inspector for receiving, verifying and safely reproducing webhook requests during development.",
    tech: ["TypeScript", "Cloudflare Workers", "Webhooks"],
    href: "https://github.com/OlamilekanCode/ReqBug",
    linkLabel: "View on GitHub",
  },
];

export const processSteps = [
  {
    title: "Define",
    body: "We clarify the business goal, users, essential features, timeline and success criteria.",
  },
  {
    title: "Build",
    body: "You see progress in useful milestones while I design, develop and connect the system.",
  },
  {
    title: "Launch",
    body: "We test the important journeys, deploy carefully and leave you with a maintainable handoff.",
  },
];

export const principles = [
  "Lagos-based, working worldwide",
  "Direct access to the developer",
  "Milestone-based delivery",
  "Documented, maintainable handoff",
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
