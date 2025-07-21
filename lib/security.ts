const REQUIRED_ENV_VARS = ["AIRTABLE_API_KEY", "AIRTABLE_BASE_ID", "AIRTABLE_TABLE", "AIRTABLE_VIEW"] as const

export const validateEnvironment = (): void => {
  if (process.env.NODE_ENV !== "production") return

  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key])

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(", ")} - using fallback data`)
  }
}

export const sanitizeInput = (input: string): string => {
  if (typeof input !== "string") return ""
  return input.replace(/[<>]/g, "").trim().slice(0, 1000)
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export const checkRateLimit = (identifier: string, limit = 10, windowMs = 60000): boolean => {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}
