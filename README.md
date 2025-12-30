# Daily AI Workflow Design

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/kismetd/v0-daily-ai-workflow)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/Gzoq92ebEE3)

## Overview

This is a Daily AI Workflow discovery platform that showcases AI-powered marketing strategies. The app features a collection of curated workflows with detailed breakdowns, execution plans, and market insights.

## Features

- **Featured Workflows**: Curated AI marketing workflows with detailed metrics
- **Workflow Library**: Browse and explore different AI workflows
- **Workflow Breakdowns**: Detailed execution plans and market insights
- **Firecrawl Integration**: Web scraping and crawling capabilities at `/tools/firecrawl`

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firecrawl API key (required for the scraping tool)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kismetd/v0-daily-ai-workflow.git
cd v0-daily-ai-workflow
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local and add your FIRECRAWL_API_KEY
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

### Required
- `FIRECRAWL_API_KEY` - Your Firecrawl API key for web scraping

### Optional
- `FIRECRAWL_BASE_URL` - Override Firecrawl base URL (defaults to `https://api.firecrawl.dev/v1`)
- `OPENAI_API_KEY` - For future AI features
- `VERCEL_URL` - Your Vercel deployment URL
- `REVALIDATE_SECRET` - Secret for cache revalidation
- `GOOGLE_VERIFICATION_CODE` - Google site verification
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID

## Firecrawl Integration

The Firecrawl tool is available at `/tools/firecrawl` and supports both scraping single URLs and crawling entire sites.

### API Usage

```bash
# Scrape a single URL
curl -X POST http://localhost:3000/api/firecrawl \
  -H "Content-Type: application/json" \
  -d '{ "url": "https://example.com", "mode": "scrape", "options": {"formats":["markdown","json"]} }'

# Crawl a site
curl -X POST http://localhost:3000/api/firecrawl \
  -H "Content-Type: application/json" \
  -d '{ "url": "https://example.com", "mode": "crawl", "options": {"maxDepth": 1, "limit": 3} }'
```

## Deployment

Your project is live at:

**[https://vercel.com/kismetd/v0-daily-ai-workflow](https://vercel.com/kismetd/v0-daily-ai-workflow)**

Continue building your app on:

**[https://v0.dev/chat/projects/Gzoq92ebEE3](https://v0.dev/chat/projects/Gzoq92ebEE3)**

## Tech Stack

- **Framework**: Next.js 14.2.35
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── tools/           # Tool pages (Firecrawl)
│   └── page.tsx         # Homepage
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── lib/                 # Utilities and data
│   ├── types.ts        # TypeScript types
│   ├── fallback-data.ts # Default workflow data
│   └── ...             # Other utilities
└── public/             # Static assets
```

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## License

This project is private and proprietary.
