# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run start        # Production server
```

**Pre-commit checks**: Always run `npm run lint && npm run build` before committing.

## Commit Conventions

Conventional Commits format required:
```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
Scope (optional): blog, events, resources, formations, ui, api
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router, React 19, Server Components by default)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Integrations**: Luma (events), Resend (newsletter), Supabase (planned)

### Project Structure

```
app/
├── (public)/             # Marketing pages (SSG)
│   ├── page.tsx          # Landing
│   ├── events/           # Events + replays
│   ├── blog/[slug]/      # Articles
│   ├── ressources/[slug]/
│   ├── formations/[slug]/
│   └── soutenir/
├── api/newsletter/       # Newsletter API route
└── layout.tsx            # Root layout

components/
├── ui/                   # shadcn/ui (do not modify directly)
├── layout/               # Header, Footer
├── events/               # EventCard, EventList
├── blog/                 # ArticleCard
├── resources/            # ResourceCard
└── forms/                # NewsletterForm

lib/
├── types/content.ts      # Event, Article, Resource interfaces
├── validations/          # Zod schemas
├── data/                 # Data fetching utilities
└── utils.ts              # cn(), formatDate(), slugify()

data/
└── events.json           # Event data (Phase 1, will migrate to Supabase)
```

### Data Flow
- **Phase 1 (current)**: Static JSON in `data/events.json`
- **Phase 2 (planned)**: Supabase with Server Components fetch

### Key Patterns
- Server Components for data fetching
- Server Actions for mutations
- Zod schemas in `lib/validations/` for validation
- `cn()` utility from `lib/utils.ts` for conditional Tailwind classes
- UI component imports always from `@/components/ui/`

## Code Conventions

- **Language**: French for UI text, English for code
- **Styling**: Tailwind only, use `cn()` for conditional classes
- **Components**: Use existing shadcn/ui components from `components/ui/`

## Environment Variables

Required in `.env.local`:
```
RESEND_API_KEY=
```

Optional (for Supabase integration):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## MCP Servers

- **Context7**: Documentation des librairies à jour. Usage : questions sur les APIs, syntaxe.
- **Chrome DevTools**: Automatisation navigateur (scraping, tests UI, navigation web). Lancer Chrome avec `--remote-debugging-port=9222` avant utilisation.

## Feature Documentation

Detailed PRDs available in `docs/`:
- `prd-01-events-listing-filters.md` - Events page with filtering system
- `prd-02-talk-submissions.md` - Talk submission feature
