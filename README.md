# DevEntro Studio

A responsive software-development portfolio and lead-generation site for DevEntro Studio, the software development brand of Aliameen Fatunbi.

Live site: <https://dev.deventro.site>

![DevEntro Studio homepage](public/deventro-studio-home.png)

## Overview

DevEntro Studio presents services, selected work, technical capabilities and a contact flow for potential clients. It is built as a static Next.js site and deployed on Cloudflare Pages.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- CSS
- Cloudflare Pages static hosting

## Features

- Responsive landing page for desktop and mobile
- Services, selected work, process and capability sections
- Static export configured with `output: "export"`
- Contact form powered by a Cloudflare Pages Function, Resend and Cloudflare Turnstile
- Custom favicon in `public/favicon.svg`
- Email delivered to `support@deventro.site`
- Preview screenshot captured from the live deployment

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Checks

```bash
npm run lint
npm run typecheck
```

CI runs lint, typecheck and build on every push and pull request.

## Test the contact form locally

Copy `.dev.vars.example` to `.dev.vars` and fill in the secrets, then:

```bash
npm run preview
```

This builds the static site and serves it with the Pages Function through Wrangler. For a dry run without real keys, use Cloudflare's Turnstile test keys (site key `1x00000000000000000000AA` via `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, secret `1x0000000000000000000000000000000AA`, hostname `example.com`).

## Production build

```bash
npm run build
```

The static export is generated in `out/`.

## Deployment

This project is deployed to Cloudflare Pages at:

<https://dev.deventro.site>

Cloudflare Pages settings:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `out`
- Framework preset: `Next.js (Static HTML Export)`
- Custom domain: `dev.deventro.site`

The contact form posts to `functions/api/contact.js`, then sends mail through Resend.

Cloudflare setup:

- Add `RESEND_API_KEY` as an encrypted Pages secret.
- Add `TURNSTILE_SECRET_KEY` as an encrypted Pages secret.
- Verify `deventro.site` in Resend.
- Allow `website@deventro.site` as the sender address.
- Optionally set `TURNSTILE_HOSTNAMES` (comma-separated) to accept tokens from preview domains; it defaults to `dev.deventro.site`.
- Add a WAF rate limiting rule for `/api/contact`; the in-function limiter is best effort only.
- Keep Cloudflare Email Routing forwarding `support@deventro.site` to the inbox that receives client inquiries.

## Project structure

```text
app/
  _components/     Contact form (client) and icons
  content.ts       Copy, services, projects and links
  globals.css      Global styles and responsive layout
  layout.tsx       Fonts, metadata and structured data
  opengraph-image.tsx  Social preview image generated at build
  page.tsx         Landing page sections
  robots.ts, sitemap.ts
functions/
  api/contact.js   Contact form endpoint for Cloudflare Pages
public/
  deventro-studio-home.png   README preview screenshot
  favicon.svg                Site favicon
  _headers                   Security and cache headers for Cloudflare Pages
next.config.ts     Static export configuration
package.json       Scripts, dependencies and Node engine
tsconfig.json      TypeScript configuration
```

## Customize

- Main copy, services, projects and links: `app/content.ts`
- Colors, spacing and responsive behavior: `app/globals.css`
- Contact form email handling: `functions/api/contact.js`
- Page title and meta description: `app/layout.tsx`
- Static export settings: `next.config.ts`
- README preview image: `public/deventro-studio-home.png`
