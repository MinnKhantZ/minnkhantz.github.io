# mkz-ai-twin — Cloudflare Worker

AI Twin backend for Min Khant Zaw's portfolio. Receives chat messages, builds a system prompt from the embedded knowledge base, and streams responses from OpenAI's GPT model.

## Architecture

```
Client (React) ──POST──▶ Cloudflare Worker ──POST──▶ OpenAI API
  {messages}              /api/chat                   gpt-4o-mini
                          │                           (SSE stream)
                          ├ buildSystemPrompt()
                          ├ rate limiting (20/15s/IP)
                          ├ CORS whitelist
                          ├ input validation
                          └ security headers
```

## Prerequisites

- Node.js 18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (`npm install -g wrangler`)
- Cloudflare account
- OpenAI API key

## Setup

1. Install dependencies:
   ```bash
   cd worker
   npm install
   ```

2. Set the OpenAI API key as a Cloudflare secret:
   ```bash
   cd worker
   wrangler secret put OPENAI_API_KEY
   ```
   Paste your OpenAI API key when prompted (e.g. `sk-proj-...`)

3. Configure allowed origins (optional — defaults to `http://localhost:5173`):
   Edit `worker/wrangler.toml`:
   ```toml
   [vars]
   ALLOWED_ORIGINS = "http://localhost:5173,https://your-custom-domain.com"
   ```

4. Deploy:
   ```bash
   cd worker
   wrangler deploy
   ```

## Usage in Frontend

Set the environment variable before starting your frontend dev server:

```bash
VITE_WORKER_URL=https://mkz-ai-twin.your-subdomain.workers.dev npm run dev
```

Or create a `.env` file in the project root:
```
VITE_WORKER_URL=https://mkz-ai-twin.your-subdomain.workers.dev
```

## Secrets

| Secret | Description |
|--------|-------------|
| `OPENAI_API_KEY` | OpenAI API key (required) |

## Configuration (wrangler.toml `[vars]`)

| Variable | Default | Description |
|----------|---------|-------------|
| `ALLOWED_ORIGINS` | `http://localhost:5173` | Comma-separated CORS origins |
| `OPENAI_MODEL` | `gpt-4o-mini` | OpenAI model ID (change to gpt-5-mini once available) |

## Security

- **API key**: `OPENAI_API_KEY` stored as a Cloudflare secret — never in code or git
- **CORS**: Only explicitly whitelisted origins can call the API
- **Rate limiting**: 20 requests per 15 seconds per IP (in-memory sliding window)
- **Input validation**: POST only, JSON content type, max 50KB body, max 50 messages, max 3000 chars per message
- **Error sanitization**: No stack traces, no API keys, no internal error messages leaked to client
- **Security headers**: `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`

## API

### `POST /api/chat`

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "What is Min's tech stack?" }
  ]
}
```

**Response:** Server-Sent Events stream from OpenAI (HTTP 200) or JSON error (HTTP 4xx/5xx).
