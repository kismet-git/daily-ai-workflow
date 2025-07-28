import { env } from "@/lib/env"

export type ScrapeFormats = "markdown" | "html" | "links" | "screenshot" | "text" | "json"

export type ScrapeOptions = {
  formats?: ScrapeFormats[]
  includeTags?: string[]
  excludeTags?: string[]
  // allow additional provider options without losing type safety on known keys
  [key: string]: unknown
}

type FirecrawlOk<T = unknown> = { success: true; status: number; data: T }
type FirecrawlErr = { success: false; status: number; error: unknown }
export type FirecrawlResponse<T = unknown> = FirecrawlOk<T> | FirecrawlErr

async function jsonFetch<T = unknown>(path: string, payload: Record<string, unknown>): Promise<FirecrawlResponse<T>> {
  const res = await fetch(`${env.FIRECRAWL_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.FIRECRAWL_API_KEY}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store", // avoid stale results during dev
  })

  let data: unknown
  try {
    data = await res.json()
  } catch {
    data = undefined
  }

  if (!res.ok) {
    return {
      success: false,
      status: res.status,
      error: (data as any)?.error ?? data ?? `HTTP ${res.status}`,
    }
  }

  return { success: true, status: res.status, data: (data as T) ?? ({} as T) }
}

async function scrapeUrl<T = unknown>(
  url: string,
  options: ScrapeOptions = { formats: ["markdown", "json"] },
): Promise<FirecrawlResponse<T>> {
  return jsonFetch<T>("/scrape", { url, ...options })
}

async function crawlSite<T = unknown>(
  url: string,
  options: Record<string, unknown> = {},
): Promise<FirecrawlResponse<T>> {
  // Common crawl options: maxDepth, limit, allowList, blockList, formats, etc.
  return jsonFetch<T>("/crawl", { url, ...options })
}

export const firecrawl = { scrapeUrl, crawlSite }
