# DevEntro Studio

A responsive software-development portfolio and lead-generation landing page for DevEntro Studio. It is built with Next.js and TypeScript and exports as a static site for Cloudflare Pages.

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To verify the production build:

```bash
npm run build
```

The deployable static site is generated in `out/`.

## Push it to your GitHub

Create an empty repository on GitHub, for example `deventro-studio`. Do not add a GitHub README or `.gitignore`, because both are already included here.

Before committing, make sure Git uses an email address that is verified on your GitHub account:

```bash
git config user.name "Olamilekan"
git config user.email "YOUR_VERIFIED_GITHUB_EMAIL"
```

Then run these commands from this project folder:

```bash
git init
git add -- app public .gitignore README.md next.config.ts package.json tsconfig.json
git commit -m "Build DevEntro Studio landing page"
git branch -M main
git remote add origin https://github.com/OlamilekanCode/deventro-studio.git
git push -u origin main
```

The commit will appear on your GitHub profile when its author email is connected to your GitHub account and the commit is on the repository's default branch. A public repository is the clearest portfolio proof.

After `npm install` creates `package-lock.json`, include that file in the same first commit or in a follow-up dependency-lock commit.

## Deploy from GitHub to Cloudflare Pages

1. Open the Cloudflare dashboard and go to **Workers & Pages**.
2. Select **Create application** → **Pages** → **Import an existing Git repository**.
3. Select `OlamilekanCode/deventro-studio`.
4. Use these build settings:
   - Production branch: `main`
   - Framework preset: `Next.js (Static HTML Export)`
   - Build command: `npx next build`
   - Build output directory: `out`
5. Deploy and first confirm the generated `*.pages.dev` URL works.
6. In the Pages project, open **Custom domains** and add `dev.deventro.site`.

If you previously added DNS records for another host, switch only the records for `dev.deventro.site` after the Pages URL works. Do not delete the root `deventro.site` records or any MX records used for email.

## Customize

- Main content and projects: `app/page.tsx`
- Colors and layout: `app/globals.css`
- Page title and description: `app/layout.tsx`
- Favicon: `public/favicon.svg`

The contact buttons currently open an email to `adebukolaolamilekan123@gmail.com`; update the `mailto:` links in `app/page.tsx` when your business email is ready.
