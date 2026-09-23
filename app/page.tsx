import ContactForm from "./_components/ContactForm";
import { ArrowIcon, Icon } from "./_components/Icons";
import { HeroVisual, Reveal, ScrollProgress } from "./_components/Motion";
import {
  capabilities,
  CONTACT_EMAIL,
  faqs,
  GITHUB_URL,
  pad,
  principles,
  processSteps,
  projects,
  REPLY_TIME,
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
      <ScrollProgress />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <Brand />

        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
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
            <Reveal immediate>
              <Eyebrow>Software development for ambitious businesses</Eyebrow>
            </Reveal>
            <Reveal as="h1" immediate delay={0.08}>
              From a rough idea to a <em>working product.</em>
            </Reveal>
            <Reveal as="p" className="hero-lede" immediate delay={0.18}>
              I&apos;m Aliameen, a full-stack developer who designs and builds
              websites, custom platforms, backend systems and AI-enabled
              workflows—so you can stop working around your tools and start
              growing with them.
            </Reveal>
            <Reveal className="hero-actions" immediate delay={0.28}>
              <a className="button button-primary" href="#contact">
                Tell me about your project <ArrowIcon />
              </a>
              <a className="text-link" href="#work">
                See selected work <span aria-hidden="true">↓</span>
              </a>
            </Reveal>
            <Reveal as="p" className="availability" immediate delay={0.38}>
              <span className="pulse" aria-hidden="true" />
              Available for selected projects worldwide
            </Reveal>
          </div>

          <HeroVisual />
        </section>

        <ul className="proof-strip" aria-label="Working principles">
          {principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>

        <section className="section work" id="work">
          <Reveal className="section-heading work-heading">
            <div>
              <Eyebrow>Selected work</Eyebrow>
              <h2>Built beyond the mockup.</h2>
            </div>
            <p>
              Real products across publishing, education, travel and developer
              tooling—each one designed, built and shipped end to end.
            </p>
          </Reveal>

          <div className="project-list">
            {projects.map((project, index) => (
              <Reveal as="article" className="project-row" key={project.title}>
                <span className="project-index">{pad(index)}</span>
                <div className="project-main">
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="highlight-list">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
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
              </Reveal>
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
          <Reveal className="section-heading">
            <Eyebrow>What I build</Eyebrow>
            <h2>Software designed around the outcome.</h2>
            <p>
              Not every problem needs a big platform. Sometimes it&apos;s a
              focused website; sometimes it&apos;s an integration behind the
              scenes. I start with the problem and recommend the smallest thing
              that solves it well.
            </p>
          </Reveal>

          <div className="service-grid">
            {services.map((service, index) => (
              <Reveal
                as="article"
                className="service-card"
                delay={index * 0.08}
                key={service.title}
              >
                <span className="service-number">{pad(index)}</span>
                <div className="service-icon">
                  <Icon name={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <ul className="deliverables">
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section process" id="process">
          <Reveal className="process-heading">
            <Eyebrow light>How it works</Eyebrow>
            <h2>A clear path from problem to launch.</h2>
          </Reveal>
          <ol className="process-grid">
            {processSteps.map((step, index) => (
              <Reveal as="li" delay={index * 0.1} key={step.title}>
                <b>{pad(index)}</b>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <p className="step-output">{step.output}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="section about" id="about">
          <div>
            <Eyebrow>About</Eyebrow>
            <h2>One developer, from first call to launch.</h2>
          </div>
          <Reveal className="about-body" delay={0.1}>
            <p>
              DevEntro Studio is the software practice of Aliameen Fatunbi, a
              full-stack developer based in Lagos. You work directly with the
              person designing and writing your code—no hand-offs, no account
              managers, no guessing who is responsible.
            </p>
            <p>
              I care about software that stays useful after launch: clear
              structure, sensible security and documentation your team (or the
              next developer) can actually follow.
            </p>
            <h3>Tools I use</h3>
            <ul className="capability-list">
              {capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="section faq" id="faq">
          <Reveal className="section-heading">
            <Eyebrow>Questions</Eyebrow>
            <h2>Before we start.</h2>
            <p>
              Anything else? Ask in the form below or email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </Reveal>
          <Reveal className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </Reveal>
        </section>

        <section className="contact-section" id="contact">
          <Reveal className="contact-copy">
            <Eyebrow light>Have a project in mind?</Eyebrow>
            <h2>Let&apos;s turn it into something people can use.</h2>
            <p>
              Share the problem, your timeline and where you are today.
              I&apos;ll reply {REPLY_TIME} with honest feedback and a practical
              next step—even if that means I&apos;m not the right fit.
            </p>
            <div className="contact-details">
              <span>Based in Lagos · Working worldwide</span>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
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
