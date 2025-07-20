/**
 * Basic runtime checks to ensure all required environment variables are set.
 * In production, throw an error so the deployment fails fast instead of
 * crashing at runtime.
 */
const REQUIRED_VARS = ["AIRTABLE_API_KEY", "AIRTABLE_BASE_ID", "AIRTABLE_TABLE", "CRON_SECRET"]

export function validateEnvironment(): void {
  if (process.env.NODE_ENV !== "production") return

  const missing = REQUIRED_VARS.filter((key) => !process.env[key])
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }
}
