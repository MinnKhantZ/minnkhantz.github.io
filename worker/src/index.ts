import { Hono } from 'hono'
import { buildSystemPrompt } from './knowledge'

type Bindings = {
  ALLOWED_ORIGINS: string
  OPENAI_MODEL: string
  OPENAI_API_KEY: string
}

type RateLimitStore = {
  [ip: string]: number[]
}

const app = new Hono<{ Bindings: Bindings }>()

const rateLimit: RateLimitStore = {}
const RATE_WINDOW = 15_000
const RATE_MAX = 20

app.use('/api/*', async (c, next) => {
  const origins = (c.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',').map(s => s.trim())
  const origin = c.req.header('origin') || ''

  if (origins.includes('*')) {
    c.res.headers.set('Access-Control-Allow-Origin', origin || '*')
  } else if (origins.includes(origin)) {
    c.res.headers.set('Access-Control-Allow-Origin', origin)
  } else if (origins.length > 0 && origins[0] !== '*') {
    c.res.headers.set('Access-Control-Allow-Origin', origins[0])
  } else {
    c.res.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
  }

  c.res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  c.res.headers.set('Access-Control-Max-Age', '86400')
  c.res.headers.set('X-Content-Type-Options', 'nosniff')
  c.res.headers.set('X-Frame-Options', 'DENY')
  c.res.headers.set('Strict-Transport-Security', 'max-age=31536000')

  if (c.req.method === 'OPTIONS') {
    return c.body(null, 204)
  }

  await next()
})

app.post('/api/chat', async (c) => {
  try {
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown'
    const now = Date.now()

    if (!rateLimit[ip]) rateLimit[ip] = []
    rateLimit[ip] = rateLimit[ip].filter(t => now - t < RATE_WINDOW)

    if (rateLimit[ip].length >= RATE_MAX) {
      return c.json({ error: 'Too many requests. Please wait before sending another message.' }, 429, {
        'Retry-After': '15'
      })
    }

    rateLimit[ip].push(now)

    const contentType = c.req.header('content-type') || ''
    if (!contentType.includes('application/json')) {
      return c.json({ error: 'Content-Type must be application/json' }, 400)
    }

    const rawBody = await c.req.text()
    if (rawBody.length > 50_000) {
      return c.json({ error: 'Request body too large (max 50KB)' }, 400)
    }

    let body: Record<string, unknown>
    try {
      body = JSON.parse(rawBody)
    } catch {
      return c.json({ error: 'Invalid JSON body' }, 400)
    }

    const { messages } = body as { messages?: unknown }

    if (!Array.isArray(messages)) {
      return c.json({ error: 'messages must be an array' }, 400)
    }

    if (messages.length === 0) {
      return c.json({ error: 'messages cannot be empty' }, 400)
    }

    if (messages.length > 50) {
      return c.json({ error: 'Too many messages (max 50)' }, 400)
    }

    for (const msg of messages) {
      if (!msg || typeof msg !== 'object') {
        return c.json({ error: 'Each message must be an object with role and content' }, 400)
      }
      if (!msg.role || typeof msg.role !== 'string' || !msg.content || typeof msg.content !== 'string') {
        return c.json({ error: 'Each message must have string role and content fields' }, 400)
      }
      if (msg.content.length > 3000) {
        return c.json({ error: 'Message content too long (max 3000 characters)' }, 400)
      }
    }

    const apiKey = c.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error('OPENAI_API_KEY not configured')
      return c.json({ error: 'AI service configuration error' }, 500)
    }

    const systemPrompt = buildSystemPrompt()
    const model = c.env.OPENAI_MODEL || 'gpt-4o-mini'

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 25000)

    let response: Response
    try {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages,
          ],
          stream: true,
          max_completion_tokens: 2000,
          temperature: 0.7,
        }),
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timeoutId)
    }

    if (!response.ok) {
      const errText = await response.text().catch(() => 'unknown error')
      console.error('OpenAI API error:', response.status, errText)
      if (response.status === 401) {
        return c.json({ error: 'AI service authentication failed' }, 500)
      }
      if (response.status === 429) {
        return c.json({ error: 'AI service is currently overloaded. Try again shortly.' }, 503)
      }
      return c.json({ error: 'AI service temporarily unavailable' }, 503)
    }

    if (!response.body) {
      return c.json({ error: 'AI service returned empty response' }, 502)
    }

    const { readable, writable } = new TransformStream()
    response.body.pipeTo(writable).catch((err) => {
      console.error('Stream pipe error:', err)
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (err) {
    console.error('Chat error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.all('/api/*', (c) => c.json({ error: 'Method not allowed' }, 405))

export default app
