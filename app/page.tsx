"use client";

import { type FormEvent, useState } from "react";
import Script from "next/script";

const CONTACT_EMAIL = "support@deventro.site";
const TURNSTILE_SITE_KEY = "0x4AAAAAAERMoEacDOZDDdcO";

type ContactStatus = {
  tone: "idle" | "pending" | "success" | "error";
  message: string;
};

const services = [
  {
    number: "01",
    title: "Websites that win trust",
    body: "Fast, responsive business websites and content platforms designed around a clear customer journey—not a generic template.",
  },
  {
    number: "02",
    title: "Custom web applications",
    body: "Dashboards, booking systems, portals, internal tools and full-stack products shaped around how your business actually works.",
  },
  {
    number: "03",
    title: "APIs & integrations",
    body: "Secure backends, authentication, databases, payments, webhooks and third-party services connected into one dependable system.",
  },
  {
    number: "04",
    title: "AI-enabled workflows",
    body: "Practical AI features and automations that reduce repetitive work, organize information and help teams move faster.",
  },
];

const projects = [
  {
    title: "DevEntro",
    description:
      "An admin-managed publishing and AI-tools discovery platform with content workflows, media storage, newsletter capture and SEO infrastructure.",
    tech: "Next.js · TypeScript · Cloudflare D1/R2",
    href: "https://deventro.site",
    linkLabel: "View live site",
  },
  {
    title: "Biometric Attendance",
    description:
      "A local-first school attendance platform combining fingerprint identification, QR attendance, reporting and student management.",
    tech: "React · Node.js · PostgreSQL · .NET",
    href: "https://github.com/OlamilekanCode/biometric-attendance-system",
    linkLabel: "View on GitHub",
  },
  {
    title: "TravelWorld",
    description:
      "A booking platform with authenticated reservation APIs, availability protection, customer booking history and cancellation flows.",
    tech: "Next.js · Node.js · MongoDB · REST APIs",
    href: null,
    linkLabel: null,
  },
  {
    title: "ReqBug",
    description:
      "An ephemeral webhook inspector for receiving, verifying and safely reproducing webhook requests during development.",
    tech: "TypeScript · Cloudflare Workers · Webhooks",
    href: "https://github.com/OlamilekanCode/ReqBug",
    linkLabel: "View on GitHub",
  },
];

const capabilities = [
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

function getField(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [contactStatus, setContactStatus] = useState<ContactStatus>({
    tone: "idle",
    message: "",
  });

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);

    if (getField(formData, "website")) {
      return;
    }

    setContactStatus({
      tone: "pending",
      message: "Sending your project brief...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Unable to send message");
      }

      form.reset();
      (
        window as Window & {
          turnstile?: {
            reset: () => void;
          };
        }
      ).turnstile?.reset();
      setContactStatus({
        tone: "success",
        message: "Message sent. I will reply with a practical next step.",
      });
    } catch {
      setContactStatus({
        tone: "error",
        message: `Something went wrong. You can email ${CONTACT_EMAIL} directly.`,
      });
    }
  }

  return (
    <main>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="DevEntro Studio home">
          <span className="brand-mark">D</span>
          <span>
            DevEntro <b>Studio</b>
          </span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>

        <a
          className="header-cta"
          href="#contact"
        >
          Discuss a project <ArrowIcon />
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> Software development for ambitious businesses
          </p>
          <h1>
            From a rough idea to a <em>working product.</em>
          </h1>
          <p className="hero-lede">
            I design and build websites, custom platforms, backend systems and
            AI-enabled workflows that solve real business problems.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="#contact"
            >
              Tell me about your project <ArrowIcon />
            </a>
            <a className="text-link" href="#work">
              See selected work <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="availability">
            <span className="pulse" aria-hidden="true" />
            Available for selected projects worldwide
          </div>
        </div>

        <div className="hero-visual" aria-label="Project delivery overview">
          <div className="visual-topline">
            <span>PRODUCT DELIVERY</span>
            <span className="visual-status">● ACTIVE</span>
          </div>
          <div className="visual-window">
            <div className="visual-title">
              <span className="window-icon">D</span>
              <div>
                <strong>Your next product</strong>
                <small>Designed, built and shipped</small>
              </div>
            </div>
            <div className="progress-track">
              <span />
            </div>
            <div className="milestones">
              <div className="complete">
                <b>01</b>
                <span>Scope & strategy</span>
                <i>✓</i>
              </div>
              <div className="complete">
                <b>02</b>
                <span>Design & prototype</span>
                <i>✓</i>
              </div>
              <div className="current">
                <b>03</b>
                <span>Build & integrate</span>
                <i>→</i>
              </div>
              <div>
                <b>04</b>
                <span>Test & launch</span>
                <i>○</i>
              </div>
            </div>
          </div>
          <div className="code-chip chip-one">
            API <b>200 OK</b>
          </div>
          <div className="code-chip chip-two">
            BUILD <b>✓ PASSED</b>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Working principles">
        <span>Based in Lagos</span>
        <i />
        <span>Working worldwide</span>
        <i />
        <span>Clear milestones</span>
        <i />
        <span>Maintainable handoff</span>
      </section>

      <section className="section services" id="services">
        <div className="section-heading">
          <p className="eyebrow">
            <span /> What I build
          </p>
          <h2>Software designed around the outcome.</h2>
          <p>
            The right solution may be a focused website, a custom platform or
            an integration behind the scenes. We start with the problem.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span>
              <div className="service-icon" aria-hidden="true">
                {service.number === "01"
                  ? "◫"
                  : service.number === "02"
                    ? "⌘"
                    : service.number === "03"
                      ? "⌁"
                      : "✦"}
              </div>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section work" id="work">
        <div className="section-heading work-heading">
          <div>
            <p className="eyebrow">
              <span /> Selected work
            </p>
            <h2>Built beyond the mockup.</h2>
          </div>
          <p>
            Real product work across publishing, education, travel and
            developer infrastructure.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-row" key={project.title}>
              <span className="project-index">0{index + 1}</span>
              <div className="project-main">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-meta">
                <span>{project.tech}</span>
                {project.href && (
                  <a href={project.href} target="_blank" rel="noreferrer">
                    {project.linkLabel} <ArrowIcon />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <a
          className="github-link"
          href="https://github.com/OlamilekanCode"
          target="_blank"
          rel="noreferrer"
        >
          Explore my GitHub profile <ArrowIcon />
        </a>
      </section>

      <section className="section process" id="process">
        <div className="section-heading process-heading">
          <p className="eyebrow light">
            <span /> How we work
          </p>
          <h2>A clear path from problem to launch.</h2>
        </div>
        <div className="process-grid">
          <article>
            <b>01</b>
            <h3>Define</h3>
            <p>
              We clarify the business goal, users, essential features, timeline
              and success criteria.
            </p>
          </article>
          <article>
            <b>02</b>
            <h3>Build</h3>
            <p>
              You see progress in useful milestones while I design, develop and
              connect the system.
            </p>
          </article>
          <article>
            <b>03</b>
            <h3>Launch</h3>
            <p>
              We test the important journeys, deploy carefully and leave you
              with a maintainable handoff.
            </p>
          </article>
        </div>
      </section>

      <section className="section capability-section">
        <div>
          <p className="eyebrow">
            <span /> Technical capability
          </p>
          <h2>Modern tools, chosen for the job.</h2>
        </div>
        <div className="capability-list">
          {capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow light">
            <span /> Have a project in mind?
          </p>
          <h2>Let&apos;s turn it into something people can use.</h2>
          <p>
            Share the problem, your timeline and where you are today. I&apos;ll
            reply with a practical next step.
          </p>
          <div className="contact-details" aria-label="Contact details">
            <span>Based in Lagos</span>
            <span>Working worldwide</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleContactSubmit}>
          <div className="form-grid">
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
          </div>

          <label>
            <span>Company or brand</span>
            <input name="company" type="text" autoComplete="organization" />
          </label>

          <div className="form-grid">
            <label>
              <span>Project type</span>
              <select name="projectType" defaultValue="" required>
                <option value="" disabled>
                  Select one
                </option>
                <option>Business website</option>
                <option>Custom web application</option>
                <option>API or integration</option>
                <option>AI-enabled workflow</option>
                <option>Ongoing product support</option>
              </select>
            </label>
            <label>
              <span>Timeline</span>
              <select name="timeline" defaultValue="" required>
                <option value="" disabled>
                  Select one
                </option>
                <option>As soon as possible</option>
                <option>Within 1 month</option>
                <option>1-3 months</option>
                <option>3+ months</option>
              </select>
            </label>
          </div>

          <label>
            <span>Budget range</span>
            <select name="budget" defaultValue="">
              <option value="">Select one</option>
              <option>Under $1,000</option>
              <option>$1,000 - $3,000</option>
              <option>$3,000 - $7,500</option>
              <option>$7,500+</option>
              <option>Not sure yet</option>
            </select>
          </label>

          <label>
            <span>Project details</span>
            <textarea
              name="message"
              rows={6}
              placeholder="What are you trying to build, improve or automate?"
              required
            />
          </label>

          <label className="form-trap" aria-hidden="true">
            <span>Website</span>
            <input name="website" type="text" tabIndex={-1} />
          </label>

          <div
            className="turnstile-widget cf-turnstile"
            data-sitekey={TURNSTILE_SITE_KEY}
            data-theme="light"
          />

          <button
            className="button button-primary form-submit"
            disabled={contactStatus.tone === "pending"}
            type="submit"
          >
            {contactStatus.tone === "pending"
              ? "Sending..."
              : "Send project brief"}{" "}
            <ArrowIcon />
          </button>

          {contactStatus.message && (
            <p className={`form-status ${contactStatus.tone}`} role="status">
              {contactStatus.message}
            </p>
          )}
        </form>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">D</span>
          <span>
            DevEntro <b>Studio</b>
          </span>
        </a>
        <p>Software development by Aliameen Fatunbi.</p>
        <div>
          <a
            href="https://github.com/OlamilekanCode"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://x.com/olamiltechlife"
            target="_blank"
            rel="noreferrer"
          >
            X / Twitter
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
        </div>
      </footer>
    </main>
  );
}
