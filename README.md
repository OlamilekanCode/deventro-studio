# DevEntro Studio

[![CI](https://github.com/OlamilekanCode/deventro-studio/actions/workflows/ci.yml/badge.svg)](https://github.com/OlamilekanCode/deventro-studio/actions/workflows/ci.yml)

A responsive portfolio and lead-generation site for DevEntro Studio, the software development practice of Aliameen Fatunbi.

**Live site:** <https://dev.deventro.site>

![DevEntro Studio homepage](public/deventro-studio-home.png)

## Overview

The site presents selected work, services, the delivery process, an About section and an FAQ, and ends in a project-brief form that emails new enquiries straight to the studio inbox. It is a statically exported Next.js app served by Cloudflare Pages, with a single Pages Function handling the contact form.

## Features

- **Responsive layout** tested from 320px phones to 1440px+ desktops, with 44px tap targets, a skip link and visible focus styles
- **Motion** powered by [Motion](https://motion.dev) (Framer Motion): hero entrance, pointer-tilt product mockup, scroll reveals, a scroll progress bar and hover micro-interactions, all respecting `prefers-reduced-motion`
- **Contact form** with Cloudflare Turnstile bot protection, server-side token verification, a honeypot field, clear error messages and email delivery through Resend
- **SEO** with a generated Open Graph image, canonical URL, `robots.txt`, `sitemap.xml` and `ProfessionalService` JSON-LD
- **Security headers** (CSP, HSTS, nosniff, referrer and permissions policies) served by Cloudflare Pages
- **Typography** with Fraunces and Inter, self-hosted through `next/font`
- **Single source of copy**: all text, services, projects and FAQ entries live in `app/content.ts`

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (static export), React 19, TypeScript |
| Styling | CSS with custom properties, `next/font` |
| Animation | Motion 12 |
| Hosting | Cloudflare Pages + Pages Functions |
| Forms | Cloudflare Turnstile, Resend, Cloudflare Email Routing |
| Quality | ESLint, `tsc --noEmit`, GitHub Actions |

## Getting started

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The contact form needs the Pages Function, so use `npm run preview` (below) to test it.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Build the static export into `out/` |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler without emitting |
| `npm run preview` | Build, then serve `out/` with the Pages Function through Wrangler |

CI runs lint, typecheck and build on every push to `main` and on every pull request.

## How the contact form works

1. The browser renders the Turnstile widget explicitly; **Send** stays disabled until Turnstile issues a token.
2. The form posts to `/api/contact` (`functions/api/contact.js`).
3. The function verifies the token with Turnstile `siteverify` and checks the hostname.
4. It validates the fields and sends the email through Resend from `website@deventro.site` to `support@deventro.site`, with the visitor as `reply_to`.
5. Cloudflare Email Routing forwards `support@deventro.site` to the studio's personal inbox.

The Turnstile widget resets after every attempt because tokens are single-use, and transient widget errors are retried twice before the visitor sees a message.

## Environment variables

Set these in **Cloudflare Pages → Settings → Variables and secrets** (Production), then redeploy.

| Name | Type | Required | Notes |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Secret | Yes | Resend API key with send access for `deventro.site` |
| `TURNSTILE_SECRET_KEY` | Secret | Yes | Secret key of the Turnstile widget whose site key is used on the page |
| `TURNSTILE_HOSTNAMES` | Text | No | Comma-separated hostnames allowed to issue tokens; defaults to `dev.deventro.site` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Build variable | No | Overrides the public site key at build time (useful for test keys) |

## Test the contact form locally

Copy `.dev.vars.example` to `.dev.vars`, fill in the values, then run:

```bash
npm run preview
```

For a dry run without real keys, use Cloudflare's Turnstile test keys: build with `NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA`, and set `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` and `TURNSTILE_HOSTNAMES=example.com`.

> Test keys issue short dummy tokens. Real tokens are 700+ characters (up to 2048), so always do one real submission on the live site after changing token handling.

## Deployment

Cloudflare Pages deploys `main` automatically.

- Build command: `npm run build`
- Build output directory: `out`
- Production branch: `main`
- Custom domain: `dev.deventro.site`

One-time setup:

- Verify `deventro.site` in Resend and allow `website@deventro.site` as a sender.
- Create a Turnstile widget with `dev.deventro.site` as a hostname and store its secret as `TURNSTILE_SECRET_KEY`.
- In Email Routing, forward `support@deventro.site` to a verified destination inbox.
- Recommended: add a WAF rate limiting rule for `/api/contact`. The in-function limiter is per isolate and best effort only.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Turnstile shows **Verification failed** only in your own browser | A browser extension (crypto wallets are common) is throwing errors inside the page. Try an Incognito window. |
| Form returns **Security verification failed** | Check **Pages → Deployments → Details → Functions → Real-time logs** while submitting. `invalid-input-response` means the token was rejected (wrong widget secret or a modified token); `invalid-input-secret` means the secret itself is wrong. |
| Form returns **The security check expired** | The token was reused or older than 5 minutes. The widget refreshes automatically; submit again. |
| Email not arriving | Check the Email Routing **Activity log** and the Gmail spam folder. |
| Variable changes have no effect | Pages only applies new variables to new deployments. Use **Retry deployment**. |

## Project structure

```text
app/
  _components/
    ContactForm.tsx      Client form with Turnstile rendering and submission
    Icons.tsx            SVG service icons and arrow
    Motion.tsx           Reveal, hero visual and scroll progress animations
  content.ts             Copy, services, projects, FAQ and links
  globals.css            Design tokens, layout and responsive styles
  layout.tsx             Fonts, metadata and JSON-LD
  opengraph-image.tsx    Social preview image generated at build
  page.tsx               Page sections (server component)
  robots.ts, sitemap.ts
functions/
  api/contact.js         Pages Function: Turnstile verification and Resend email
public/
  _headers               Security and cache headers
  deventro-studio-home.png
  favicon.svg
.github/workflows/ci.yml Lint, typecheck and build
```

## Customize

- Copy, services, projects, FAQ and reply time: `app/content.ts`
- Colors, spacing and breakpoints: `app/globals.css`
- Animations: `app/_components/Motion.tsx`
- Email handling: `functions/api/contact.js`
- Page title, description and fonts: `app/layout.tsx`
- Security headers and CSP: `public/_headers`
