"use client"

import type React from "react"

import { useState } from "react"

type Mode = "scrape" | "crawl"

export default function FirecrawlToolPage() {
  const [url, setUrl] = useState("")
  const [mode, setMode] = useState<Mode>("scrape")
  const [optionsJson, setOptionsJson] = useState('{\n  "formats": ["markdown", "json"]\n}')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    let options: Record<string, unknown> | undefined
    try {
      options = optionsJson ? JSON.parse(optionsJson) : undefined
    } catch (err: any) {
      setLoading(false)
      setError(`Options JSON is invalid: ${err?.message || String(err)}`)
      return
    }

    try {
      const res = await fetch("/api/firecrawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, mode, options }),
      })

      const data = await res.json()
      if (!res.ok || (data && data.success === false)) {
        setError((data?.error && JSON.stringify(data.error)) || `HTTP ${res.status}`)
      } else {
        setResult(data)
      }
    } catch (err: any) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  const pretty = (obj: unknown) => JSON.stringify(obj, null, 2)

  const md =
    (result as any)?.data?.markdown ||
    (result as any)?.data?.content ||
    (Array.isArray((result as any)?.data) ? (result as any)?.data[0]?.markdown : undefined)

  function copyJSON() {
    navigator.clipboard.writeText(pretty(result))
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Firecrawl Tester</h1>
      <p className="mt-2 text-sm text-gray-500">
        Paste a URL, choose <code>scrape</code> or <code>crawl</code>, optionally tweak options, and see the JSON
        response below.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">URL</label>
          <input
            type="url"
            required
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="rounded-md border border-gray-300 px-2 py-2"
          >
            <option value="scrape">Scrape (single page)</option>
            <option value="crawl">Crawl (multiple pages)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Options (JSON)</label>
          <textarea
            rows={6}
            value={optionsJson}
            onChange={(e) => setOptionsJson(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">
            Example keys: <code>formats</code>, <code>allowList</code>, <code>blockList</code>, <code>maxDepth</code>,{" "}
            <code>limit</code>, etc.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Running..." : "Run"}
        </button>
      </form>

      {error && (
        <div className="mt-6 rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-6">
          {md && (
            <div>
              <h2 className="mb-2 text-lg font-medium">Markdown Preview (first page)</h2>
              <pre className="whitespace-pre-wrap rounded-md border bg-white p-4 text-sm">{md.slice(0, 4000)}</pre>
            </div>
          )}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-medium">Raw JSON</h2>
              <button onClick={copyJSON} className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50" type="button">
                Copy
              </button>
            </div>
            <pre className="overflow-auto rounded-md border bg-white p-4 text-xs">{pretty(result)}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
