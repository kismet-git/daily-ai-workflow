// Minimal, dependency-free env validation for required keys.
// NOTE: This throws at import time if FIRECRAWL_API_KEY is missing.
// Make sure the secret is set in v0 before running a build.

function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v || !v.trim()) throw new Error(`Missing required env var: ${name}`)
  return v.trim()
}

export const env = {
  FIRECRAWL_API_KEY: requireEnv("FIRECRAWL_API_KEY"),
  FIRECRAWL_BASE_URL: (process.env.FIRECRAWL_BASE_URL ?? "https://api.firecrawl.dev/v1").replace(/\/$/, ""),
}
