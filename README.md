# Daily ai workflow design

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/kismetd/v0-daily-ai-workflow)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/Gzoq92ebEE3)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/kismetd/v0-daily-ai-workflow](https://vercel.com/kismetd/v0-daily-ai-workflow)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/Gzoq92ebEE3](https://v0.dev/chat/projects/Gzoq92ebEE3)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Firecrawl Integration

Only `FIRECRAWL_API_KEY` is required. The base URL defaults to `https://api.firecrawl.dev/v1` and can be optionally overridden with `FIRECRAWL_BASE_URL`.

Set env vars:

\`\`\`bash
# local
cp .env.example .env.local
# then edit .env.local and add your Firecrawl API key
\`\`\`

\`\`\`bash
# GET (quick test)
curl "http://localhost:3000/api/firecrawl?url=https://example.com&mode=scrape"

# Scrape a single URL (POST)
curl -X POST http://localhost:3000/api/firecrawl \
  -H "Content-Type: application/json" \
  -d '{ "url": "https://example.com", "mode": "scrape", "options": {"formats":["markdown","json"]} }'

# Crawl a site (POST)
curl -X POST http://localhost:3000/api/firecrawl \
  -H "Content-Type: application/json" \
  -d '{ "url": "https://example.com", "mode": "crawl", "options": {"maxDepth": 1, "limit": 3} }'
\`\`\`

**After v0 applies changes**
- Only `FIRECRAWL_API_KEY` is required in v0 → Environment Variables
- Run: `npm run type-check && npm run build`
- Visit `/tools/firecrawl` and test both **Scrape** and **Crawl**
- Share file diffs and any build errors
