# Blompline

A web platform that lets anyone create and publish beautiful blogs, portfolios, resumes, and more — without writing a single line of code or knowing how to design.

Select a component. Fill in your content. Hit publish. Your page is live.

---

## What it does

Blompline gives you a component-based page builder where you assemble pages from pre-designed blocks — hero sections, project grids, experience timelines, contact forms, and more. Every component is designed to look good out of the box. You just bring the content.

**Page types supported:**
- Blog — write and publish articles with a built-in rich text editor
- Portfolio — showcase your work with a project grid and about section
- Resume — structured experience, skills, and contact info
- More coming

**Key features:**
- Block-based builder — add, edit, and reorder components on your page
- One-click publish — your page goes live at a real URL instantly
- No design skills required — every component handles its own styling
- AI writing assistant — generate and improve your content with one click *(coming soon)*
- Email subscriptions — let readers subscribe to your page *(coming soon)*
- Custom domains — connect your own domain to your published page *(coming soon)*

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Auth | Clerk |
| Deployment | Vercel |
| File storage | Cloudflare R2 *(coming soon)* |

---

## Architecture decisions

**Schema-driven components** — every component is defined by a JSON schema that describes its editable fields. The builder UI is generated from that schema. Adding a new component type means writing a schema and a renderer — nothing else changes.

**Content and design are separated** — a user's words live in the database as structured JSON. Design tokens (fonts, colors, spacing) live in a separate theme object. Swapping a theme re-renders the entire page without touching any content.

**Immutable publish snapshots** — when a user hits Publish, a full snapshot of their page is written to the database. Live pages are served from that snapshot, never from a live database query. This means published pages stay up even if the API goes down, and every publish is a restorable version.

**External services behind adapters** — billing, email, and AI are never called directly from route handlers. They go through a service layer (`billing.subscribe()`, `mailer.send()`, `ai.generate()`), making each provider swappable without touching business logic.

---

## Project structure

```
blompline/
├── app/
│   ├── (auth)/          # Auth routes (Clerk)
│   ├── dashboard/       # Builder and page management
│   ├── u/[username]/    # Published user pages
│   └── api/             # API route handlers
├── components/
│   ├── ui/              # shadcn/ui base components
│   ├── builder/         # Page builder UI components
│   └── blocks/          # Page component renderers
├── lib/
│   ├── prisma.ts        # Prisma client instance
│   └── utils.ts         # Shared utilities
└── prisma/
    └── schema.prisma    # Database schema
```

---

## Getting started

### Prerequisites
- Node.js 18+
- A PostgreSQL database (Neon free tier works)
- A Clerk account (free tier works)

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/blompline.git
cd blompline

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your values (see Environment variables below)

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env.local` file with the following:

```bash
# Database
DATABASE_URL=your_neon_postgres_connection_string

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

---

## Roadmap

### v1 — current
- [x] Project setup — Next.js, TypeScript, Tailwind, Prisma, Clerk
- [ ] Page builder core — add, edit, reorder blocks
- [ ] Blog page type with rich text editor
- [ ] Portfolio page type
- [ ] Resume page type
- [ ] One-click publish to live URL
- [ ] Waitlist landing page

### v2 — next
- [ ] Custom domains with auto SSL
- [ ] Email subscriptions
- [ ] AI writing assistant
- [ ] Theme switcher
- [ ] Page analytics

### v3 — later
- [ ] Templates marketplace
- [ ] Stripe billing + subscription tiers
- [ ] Zapier / Make integrations
- [ ] AI resume scanner

---

## License

MIT
