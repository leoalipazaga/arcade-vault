# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Critical: Next.js 16 (not from your training data)

This project uses **Next.js 16.2.9 + React 19.2** with the App Router. Per `AGENTS.md`, APIs and conventions differ from older Next.js. **Read the relevant guide under `node_modules/next/dist/docs/` before writing or editing any Next.js code.** The bundled docs are the source of truth, not prior knowledge.

Docs layout:

- `node_modules/next/dist/docs/01-app/` — App Router (this project)
- `node_modules/next/dist/docs/03-architecture/` — architecture/internals
- `node_modules/next/dist/docs/index.md` — entry point

## What this project is: a prototype port

Arcade Vault is a retro-arcade game library where players compete for high scores (visual MVP — no real game logic). The work is **porting a working React-18 prototype to Next.js 16 App Router + TypeScript**. Two halves:

- **`references/templates/*.jsx`** — the source prototype. Plain React 18 over CDN (no build, no imports), hash-based routing in `app.jsx`, mock data in `data.jsx`, one component file per screen (`biblioteca`, `detalle`, `reproductor`, `salon`, `auth`, `nav`). `Arcade Vault.html` runs it standalone. **This is the spec for look, behavior, and copy** — read it before building a screen.
- **`app/`** — the Next.js target. Currently still the `create-next-app` boilerplate (`page.tsx` untouched) except `layout.tsx` and `globals.css`, which already carry the ported theme.

Prototype copy is in **Spanish**; per prior decision, real App Router routes use **English** path names. Screen → route mapping:

| Prototype (`app.jsx`) | Screen | App Router route |
|---|---|---|
| `biblioteca` | game library (home) | `/` |
| `detalle` | game detail + leaderboard | `/games/[id]` (or similar) |
| `player` / `reproductor` | CRT game player | player route |
| `salon` | Hall of Fame | hall-of-fame route |
| `auth` | login/signup | auth route |

Prototype state (`user`, scores) lives in `localStorage` (`av_user`, `av_scores`). Decide client/server split per the Next 16 docs when porting.

## The design system lives in `globals.css`, not Tailwind utilities

`app/globals.css` is the ported design system (mirrors `references/templates/styles.css`). It defines **semantic component classes** the markup uses directly — `.av-nav`, `.card`, `.cover-*` (pure-CSS game art), `.crt` (the arcade-cabinet player), `.leaderboard`, `.podium`, `.btn` variants, neon/pixel text helpers. Reuse and extend these classes; don't rebuild them as ad-hoc Tailwind utility soup.

- **Tailwind v4** via `@tailwindcss/postcss` — CSS-first, no `tailwind.config`. The `@theme inline` block in `globals.css` exposes design tokens (`--color-cyan`, `--font-pixel`, etc.) to Tailwind. Add tokens there.
- **Theme tokens** are CSS custom properties on `:root` (neon palette, two font stacks: `--pixel` arcade display, `--mono` body).
- **Fonts** load via `next/font/google` in `layout.tsx` (`Press_Start_2P`, `JetBrains_Mono`, `Courier_Prime`) and bind to the CSS vars — the prototype's webfont `<link>`s do NOT carry over.
- The ambient background (`.av-bg` perspective grid + scanlines, `.av-noise`) is rendered once in `layout.tsx` body.

## Workflow: Spec-Driven Development + frontend-design

Project skills live in `.agents/skills/` and are the intended workflow (see `README.md`):

- **`/spec`** then **`/spec-impl`** — write a spec, then implement against it (Klerith/fernando-skills conventions). A visual MVP spec was already approved in a prior session.
- **`frontend-design`** skill — apply for all UI/UX work; the visual direction (neon arcade) is already established in `globals.css`, so honor it rather than reinventing.

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`).

```bash
pnpm dev      # dev server (next dev)
pnpm build    # production build (next build)
pnpm start    # serve production build (next start)
pnpm lint     # eslint
```

No test runner is configured yet.

## Conventions

- **Path alias** `@/*` → repo root (`tsconfig.json`).
- TypeScript `strict` mode on.
- App Router under `app/`: `layout.tsx` (root), `page.tsx` (routes), `globals.css`.
