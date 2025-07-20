// Environment validation
export function validateEnvironment(): void {
  const requiredEnvVars = ["AIRTABLE_API_KEY", "AIRTABLE_BASE_ID", "AIRTABLE_TABLE", "AIRTABLE_VIEW"]

  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(", ")}`)
  }
}

// Input sanitization
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return ""

  return input
    .replace(/[<>]/g, "") // Remove potential XSS characters
    .trim()
    .slice(0, 1000) // Limit length
}

// Rate limiting helper
export function createRateLimiter(maxRequests: number, windowMs: number) {
  const requests = new Map<string, number[]>()

  return (identifier: string): boolean => {
    const now = Date.now()
    const windowStart = now - windowMs

    if (!requests.has(identifier)) {
      requests.set(identifier, [])
    }

    const userRequests = requests.get(identifier)!

    // Remove old requests outside the window
    const validRequests = userRequests.filter((time) => time > windowStart)

    if (validRequests.length >= maxRequests) {
      return false // Rate limit exceeded
    }

    validRequests.push(now)
    requests.set(identifier, validRequests)

    return true // Request allowed
  }
}

// Security headers
export const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com;",
}
