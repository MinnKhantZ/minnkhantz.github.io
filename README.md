# Min Khant Zaw — Portfolio v2.5

Personal portfolio built with **React 19**, **TypeScript**, **Vite 8**, and **Tailwind CSS 4**.

## Stack

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS 4, Lucide React
- **AI Twin Backend:** Cloudflare Worker (Hono), OpenAI API
- **Markdown:** react-markdown, remark-gfm

## Getting Started

### Prerequisites

- Node.js 18+

### Install

```bash
npm install
```

### Dev Server

```bash
npm run dev
```

Opens at `http://localhost:5173`.

### Build

```bash
npm run build
```

Output in `dist/`.

### Lint

```bash
npm run lint
```

## AI Twin Backend

The chatbot uses a Cloudflare Worker. See `worker/README.md` for full setup instructions, including wrangler deployment and environment secrets.

### Frontend Environment

Copy `.env.example` to `.env` and set your deployed worker URL:

```
VITE_WORKER_URL=https://portfolio-ai-twin.your-subdomain.workers.dev
```

## Project Structure

```
src/
├── App.tsx                 # Main shell with tab navigation + header/footer
├── components/
│   ├── CanvasParticles     # Interactive particle background
│   ├── ChatBot             # AI Twin chat interface
│   ├── ExperienceTab       # Work timeline, education, certifications
│   ├── HomeTab             # Hero section, stats, "What I Build"
│   ├── MarkdownRenderer    # Markdown rendering for chat responses
│   ├── ProjectsTab         # Project cards grid with video modal
│   └── SkillsTab           # Skill bars grouped by category
├── data/
│   └── portfolio.tsx       # Profile, projects, skills, experience data
├── index.css               # Tailwind entry + custom animations
└── main.tsx                # React DOM entry point

worker/
├── src/
│   ├── index.ts            # Hono worker: /api/chat endpoint
│   └── knowledge.ts        # AI system prompt with full profile data
├── wrangler.toml           # Worker configuration
└── README.md               # Worker setup guide
```

## Deployment

Build the frontend with `npm run build`, then deploy the `dist/` folder to your preferred static host (Vercel, Cloudflare Pages, GitHub Pages, etc.).

---

Built by Min Khant Zaw © 2026
