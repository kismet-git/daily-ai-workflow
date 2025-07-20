import Airtable from "airtable"

/* -------------------------------------------------------------------------- */
/*  Airtable base setup                                                       */
/* -------------------------------------------------------------------------- */

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  throw new Error("Missing required Airtable environment variables")
}

export const base = new Airtable({
  apiKey: AIRTABLE_API_KEY,
  requestTimeout: 30_000,
}).base(AIRTABLE_BASE_ID)

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface WorkflowData {
  id?: string
  title: string
  summary: string
  tags: string[]
  why: string
  signals: string
  opportunity: string
  executionPlan: string
  marketSize: string
  executionScore: number
  ctaLabel: string
  featured?: boolean
  publishedAt?: string
  difficulty?: string
  timeToComplete?: string
  impact?: string
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Retry `operation` up to `maxRetries` times with exponential back-off.
 */
export async function withRetry<T>(operation: () => Promise<T>, maxRetries = 3, delay = 1_000): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error: any) {
      // Stop retrying on auth / permission errors
      if (error?.statusCode === 401 || error?.statusCode === 403) {
        throw error
      }
      if (attempt === maxRetries) throw error

      const wait = delay * attempt
      console.warn(`[withRetry] attempt ${attempt} failed – retrying in ${wait} ms`)
      await new Promise((r) => setTimeout(r, wait))
    }
  }
  // Should be unreachable
  throw new Error("withRetry exhausted all retries")
}

/* -------------------------------------------------------------------------- */
/*  Airtable operations                                                       */
/* -------------------------------------------------------------------------- */

export async function fetchFeatured(): Promise<WorkflowData | null> {
  try {
    return await withRetry(async () => {
      const table = process.env.AIRTABLE_TABLE ?? "Workflows"
      const view = process.env.AIRTABLE_VIEW ?? "Published"

      const [record] = await base(table)
        .select({
          view,
          filterByFormula: "featured = TRUE()",
          sort: [{ field: "publishedAt", direction: "desc" }],
          maxRecords: 1,
        })
        .firstPage()

      return record ? ({ id: record.id, ...(record.fields as any) } as WorkflowData) : null
    })
  } catch (err) {
    console.error("fetchFeatured failed:", err)
    return null
  }
}

export async function fetchAllWorkflows(): Promise<WorkflowData[]> {
  try {
    return await withRetry(async () => {
      const { AIRTABLE_TABLE, AIRTABLE_VIEW } = process.env
      if (!AIRTABLE_TABLE || !AIRTABLE_VIEW) throw new Error("Airtable table/view missing")

      const records = await base(AIRTABLE_TABLE)
        .select({
          view: AIRTABLE_VIEW,
          sort: [{ field: "publishedAt", direction: "desc" }],
          pageSize: 100,
        })
        .all()

      return records.map((r) => ({ id: r.id, ...(r.fields as any) })) as WorkflowData[]
    })
  } catch (err) {
    console.error("fetchAllWorkflows failed:", err)
    return []
  }
}

export async function createWorkflow(fields: Partial<WorkflowData>) {
  return withRetry(async () => {
    const table = process.env.AIRTABLE_TABLE
    if (!table) throw new Error("Airtable table missing")

    const [record] = await base(table).create([
      {
        fields: {
          ...fields,
          publishedAt: new Date().toISOString(),
        },
      },
    ])
    return { id: record.id, ...(record.fields as any) } as WorkflowData
  })
}
