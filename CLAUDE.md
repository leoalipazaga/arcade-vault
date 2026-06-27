# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Critical: Next.js 16 (not from your training data)

This project uses **Next.js 16.2.9 + React 19.2** with the App Router. Per `AGENTS.md`, APIs and conventions differ from older Next.js. **Read the relevant guide under `node_modules/next/dist/docs/` before writing or editing any Next.js code.** The bundled docs are the source of truth, not prior knowledge.

Docs layout:
- `node_modules/next/dist/docs/01-app/` — App Router (this project)
- `node_modules/next/dist/docs/03-architecture/` — architecture/internals
- `node_modules/next/dist/docs/index.md` — entry point

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`).

```bash
pnpm dev      # dev server (next dev)
pnpm build    # production build (next build)
pnpm start    # serve production build (next start)
pnpm lint     # eslint
```

No test runner is configured yet.

## Architecture

- **App Router** under `app/` — `layout.tsx` (root layout), `page.tsx` (routes), `globals.css`.
- **Tailwind CSS v4** via `@tailwindcss/postcss` (`postcss.config.mjs`). No `tailwind.config` — v4 is CSS-first; configure in `globals.css`.
- **Path alias** `@/*` → repo root (`tsconfig.json`).
- TypeScript `strict` mode on.

## Project intent

Arcade Vault — online gaming platform where players compete for high scores (see `README.md`). Built with Spec-Driven Development (`/spec`, `/spec-impl`) following the Klerith/fernando-skills conventions.
