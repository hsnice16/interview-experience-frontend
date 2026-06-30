# AGENTS.md

Instructions for AI coding agents (Claude Code, Cursor, Codex, etc.) working on this repo.

> `CLAUDE.md` is a one-line pointer to this file. AGENTS.md is the cross-agent standard — one source of truth avoids drift.

## What this project is

**Tech Interview Experience** — a community-driven web app that lists tech interview-experience blogs from companies like Google, Microsoft, and Atlassian. Visitors browse/filter blogs by company and keyword; anyone can submit a blog link, which lands in a moderation queue and goes live only after an admin approves it.

- Live site: **https://techinterviewexp.site/** (deployed on Netlify).
- This is the **frontend only**. The GraphQL API is a separate repo, `interview-experience-backend` (custom Apollo Server on Render; its Postgres database lives on Supabase). The frontend talks to it over GraphQL.
- See `README.md` for the product narrative and screenshots.

## Stack

- **Create React App** (`react-scripts` 5) — client-side SPA, **no SSR**. CRA is no longer maintained; keep this in mind before adding tooling that assumes a modern bundler.
- **React 18** + **TypeScript 4.8**.
- **react-router-dom 6** — `createBrowserRouter` with a single catch-all route rendering `<App>`, which declares the real routes via `<Routes>` (see `src/App.tsx`).
- **Apollo Client** — GraphQL queries/mutations against the Render backend (`src/index.tsx` sets the `uri`).
- **Recoil** — global UI state (selected company / keyword filters), atoms in `src/recoil/atoms/`.
- **SASS modules** (`*.module.scss`) — per-component styles; shared tokens in `src/styles/_variables.scss`. `classnames` for conditional classes.
- **Firebase Analytics** — page-view and event logging (`src/firebase.ts`, `src/hooks/logPageViewEvent.ts`).
- **react-helmet-async** — per-route SEO meta (see SEO section).
- **Yarn** — package manager (`yarn.lock` is the lockfile; don't introduce `package-lock.json`).

## Run anything

```bash
yarn install
yarn start    # dev server at http://localhost:3000
yarn build    # production build into build/ (gitignored)
yarn test     # CRA/Jest test runner (no test files exist yet)
```

There is **no lint or format script** and **no CI** beyond GitHub housekeeping files. `react-scripts` runs ESLint (`react-app` config) during `start`/`build` only. Run `npx tsc --noEmit` for a standalone type-check.

## Environment

All runtime config comes from `REACT_APP_*` env vars in `.env.local` (gitignored). Required keys:

- Firebase: `REACT_APP_API_KEY`, `REACT_APP_AUTH_DOMAIN`, `REACT_APP_PROJECT_ID`, `REACT_APP_STORAGE_BUCKET`, `REACT_APP_MESSAGING_SENDER_ID`, `REACT_APP_APP_ID`, `REACT_APP_MEASUREMENT_ID`
- Admin/auth: `REACT_APP_RSA_PUBLIC_KEY` (encrypts the message code), `REACT_APP_MESSAGE_CODE` (gates the admin dashboard), `REACT_APP_QR_CODE`

CRA inlines `REACT_APP_*` values into the client bundle at build time — **nothing here is secret**. Treat these as public configuration, and never put a real secret in a `REACT_APP_*` var.

## Layout

```text
public/            # static shell + SEO files (index.html, robots.txt, sitemap.xml, manifest.json, _redirects)
src/
  index.tsx        # entry: ApolloProvider + HelmetProvider + RecoilRoot + RouterProvider
  App.tsx          # route table (<Routes>) + global banner/footer
  pages/           # one folder per route (home, about, add-blog, dashboard, stripe) + BlankPage (404)
  components/      # reusable UI, each in its own folder with a co-located .module.scss; re-exported from index.ts barrel
  hooks/           # custom hooks (analytics, resize listener)
  recoil/atoms/    # Recoil global state
  utils/constants/ # routes, GraphQL queries/mutations, keywords, SEO constants
  utils/functions/ # small pure helpers (URL validation, message encryption)
  styles/          # shared SASS variables
  assets/          # images + inline SVG icon components
```

## Conventions

- **Path aliases**: `tsconfig` sets `baseUrl: "src"`, so import from the project root — `import { Seo } from "components"`, `import { ROUTE_HOME } from "utils/constants/routes"`. Avoid deep relative paths.
- **Barrels**: components, hooks, assets, and recoil atoms each export through an `index.ts`. When you add one, update the barrel.
- **Components**: `src/components/<kebab-case>/<PascalCase>.tsx` + co-located `<PascalCase>.module.scss`. Pages follow the same shape under `src/pages/`.
- **Styling**: use SASS modules and the shared variables; don't add a CSS-in-JS or utility-class library.
- **GraphQL**: queries in `utils/constants/queries.ts`, mutations in `utils/constants/mutations.ts`. The query shapes must match the **custom Apollo backend** schema (e.g. `blogs`, `organizations`, `createBlog`), NOT Supabase's auto-generated `pg_graphql`.

## Gotchas

- **Hooks-as-factories**: some hooks are written as `logPageViewEvent()(...)` / `initResizeEventListener()(...)` — the outer call returns a function that _itself_ calls React hooks. Pages call these at the top of the component body. It works but violates the rules-of-hooks naming convention; preserve the existing call sites if you touch them, and don't copy the pattern into new code.
- **SPA + SEO**: there is no SSR, so non-JS crawlers (Twitter/LinkedIn/Slack link unfurlers, etc.) only ever see `public/index.html`. Per-route `<Seo>` tags only benefit JS-rendering crawlers (Googlebot). True per-route social previews would require prerendering (e.g. `react-snap`) or migrating to an SSR framework.
- **Admin dashboard** (`/protected/internal/dashboard`) is gated client-side by a `?message=` query param compared to `REACT_APP_MESSAGE_CODE`. This is obfuscation, not real security — the real auth check is the RSA-encrypted `messageCode` validated server-side on mutations.
- **`render_dump.sql`** is a one-off Postgres dump used during the Render→Supabase migration; it's gitignored (`*_dump.sql`). Don't rely on or commit it.

## SEO

- Static defaults + JSON-LD live in `public/index.html`; crawl directives in `public/robots.txt`; URLs in `public/sitemap.xml`; PWA metadata in `public/manifest.json`; an LLM-facing site summary in `public/llms.txt` (llmstxt.org format, served at `/llms.txt`). These static files in `public/` are served directly (the SPA `_redirects` fallback only applies to unmatched paths).
- Per-route meta is rendered by `<Seo>` (`src/components/seo/Seo.tsx`) using values from `src/utils/constants/seo.ts`. Every page renders it; admin/payment/404 pages pass `noindex`.
- **Tag-ownership split (don't break this):** react-helmet-async _appends_ rather than replaces tags already in `index.html`, so any tag present in BOTH places renders twice (and conflicts on inner routes). Therefore:
  - **Route-VARYING** tags live ONLY in `<Seo>`: `title`, `description`, `canonical`, `robots`, and `og:title` / `og:description` / `og:url` / `twitter:title` / `twitter:description`.
  - **Route-INVARIANT** tags live ONLY in `public/index.html`: `og:type`, `og:site_name`, `og:image*`, `og:locale`, `twitter:card` / `twitter:site` / `twitter:creator` / `twitter:image`, plus the `Organization`/`WebSite` JSON-LD. These reach non-JS social scrapers, which only ever see `index.html`.
  - Never add a varying tag to both files. When adding a route, add a `<Seo>` to its page and, if public, an entry to `public/sitemap.xml`.
- Update the canonical domain and any absolute URLs in `src/utils/constants/seo.ts`, `public/index.html`, `public/robots.txt`, and `public/sitemap.xml` together if the domain ever changes.

## Before you finish

- Run `yarn build` (or `npx tsc --noEmit`) and make sure it compiles cleanly.
- Keep imports going through the path aliases and barrels.
- Don't commit `.env.local`, `build/`, or `*_dump.sql`.
- Only commit or push when the human explicitly asks.
