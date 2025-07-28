import { type NextRequest, NextResponse } from "next/server"
import { firecrawl } from "@/lib/firecrawl"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function bad(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

type Body = {
  url?: string
  mode?: "scrape" | "crawl"
  options?: Record<string, unknown>
}

async function handle(url: string, mode: "scrape" | "crawl", options?: Record<string, unknown>) {
  return mode === "crawl" ? firecrawl.crawlSite(url, options) : firecrawl.scrapeUrl(url, options)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get("url") || undefined
  const mode = (searchParams.get("mode") as "scrape" | "crawl") || "scrape"

  if (!url) return bad("url required")

  const res = await handle(url, mode)
  return NextResponse.json(res, { status: "status" in res ? res.status : 200 })
}

export async function POST(req: NextRequest) {
  let body: Body
  try {
    body = await req.json()
  } catch {
    return bad("invalid json body")
  }

  const url = body.url?.trim()
  const mode = body.mode ?? "scrape"
  const options = body.options

  if (!url) return bad("url required")
  if (mode !== "scrape" && mode !== "crawl") return bad("mode must be 'scrape' or 'crawl'")

  const res = await handle(url, mode, options)
  return NextResponse.json(res, { status: "status" in res ? res.status : 200 })
}
