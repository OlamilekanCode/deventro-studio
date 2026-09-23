import ContactForm from "./_components/ContactForm";
import { ArrowIcon, Icon } from "./_components/Icons";
import {
  capabilities,
  CONTACT_EMAIL,
  GITHUB_URL,
  pad,
  principles,
  processSteps,
  projects,
  services,
  X_URL,
} from "./content";

function Brand({ className = "" }: { className?: string }) {
  return (
    <a
      className={`brand ${className}`}
      href="#top"
      aria-label="DevEntro Studio home"
    >
      <span className="brand-mark" aria-hidden="true">
        D
      </span>
      <span>
        DevEntro <b>Studio</b>
      </span>
    </a>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow${light ? " light" : ""}`}>
      <span aria-hidden="true" /> {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <Brand />

        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="header-cta" href="#contact">
          <span className="cta-long">Discuss a project</span>
          <span className="cta-short">Contact</span> <ArrowIcon />
        </a>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <Eyebrow>Software development for ambitious businesses</Eyebrow>
            <h1>
              From a rough idea to a <em>working product.</em>
            </h1>
            <p className="hero-lede">
              I design and build websites, custom platforms, backend systems
              and AI-enabled workflows that solve real business problems.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Tell me about your project <ArrowIcon />
              </a>
              <a className="text-link" href="#work">
                See selected work <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="availability">
              <span className="pulse" aria-hidden="true" />
              Available for selected projects worldwide
            </p>
          </div>

          <div className="hero-visual" aria-hidden="true">
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

        <ul className="proof-strip" aria-label="Working principles">
          {principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>

        <section className="section work" id="work">
          <div className="section-heading work-heading">
            <div>
              <Eyebrow>Selected work</Eyebrow>
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
                <span className="project-index">{pad(index)}</span>
                <div className="project-main">
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="project-meta">
                  <ul className="tech-list" aria-label="Technologies">
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer">
                      {project.linkLabel} <ArrowIcon />
                    </a>
                  ) : (
                    <span className="private-note">Details available on request</span>
                  )}
                </div>
              </article>
            ))}
          </div>

          <a
            className="github-link"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            Explore my GitHub profile <ArrowIcon />
          </a>
        </section>

        <section className="section services" id="services">
          <div className="section-heading">
            <Eyebrow>What I build</Eyebrow>
            <h2>Software designed around the outcome.</h2>
            <p>
              The right solution may be a focused website, a custom platform or
              an integration behind the scenes. I start with the problem.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <span className="service-number">{pad(index)}</span>
                <div className="service-icon">
                  <Icon name={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section process" id="process">
          <div className="process-heading">
            <Eyebrow light>How it works</Eyebrow>
            <h2>A clear path from problem to launch.</h2>
          </div>
          <ol className="process-grid">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <b>{pad(index)}</b>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section capability-section">
          <div>
            <Eyebrow>Technical capability</Eyebrow>
            <h2>Modern tools, chosen for the job.</h2>
          </div>
          <ul className="capability-list">
            {capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <Eyebrow light>Have a project in mind?</Eyebrow>
            <h2>Let&apos;s turn it into something people can use.</h2>
            <p>
              Share the problem, your timeline and where you are today.
              I&apos;ll reply with a practical next step.
            </p>
            <div className="contact-details">
              <span>Based in Lagos · Working worldwide</span>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </div>

          <ContactForm />
        </section>
      </main>

      <footer>
        <Brand className="footer-brand" />
        <p>
          © {new Date().getFullYear()} DevEntro Studio · Software development by
          Aliameen Fatunbi.
        </p>
        <div>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={X_URL} target="_blank" rel="noreferrer">
            X / Twitter
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
        </div>
      </footer>
    </>
  );
}
