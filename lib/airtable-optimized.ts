import Airtable from "airtable"

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  throw new Error("Missing required Airtable environment variables")
}

// Connection pooling and retry logic
export const base = new Airtable({
  apiKey: AIRTABLE_API_KEY,
  requestTimeout: 30000, // 30 second timeout
}).base(AIRTABLE_BASE_ID as string)

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

// --- retry helper -----------------------------------------------------------
/**
 * Generic helper that retries a promise-returning operation up to `maxRetries`
 * with exponential back-off (delay * attempt).
 */
export const withRetry = async <T>(\
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000\
)
: Promise<T> =>
{
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error: any) {
      // Do not retry on authentication / permission problems
      if (error?.statusCode === 401 || error?.statusCode === 403) {
        throw error
      }

      if (attempt === maxRetries) {
        throw error
      }

      console.warn(
        `[withRetry] attempt ${attempt} failed – retrying in ${delay * attempt} ms (${error?.message ?? error})`,
      )
      await new Promise((r) => setTimeout(r, delay * attempt))
    }
  }

  // This point should be unreachable
  throw new Error("withRetry: exceeded max retries without success")
}

export const fetchFeatured = async (): Promise<WorkflowData | null> => {
  try {
    return await withRetry(async () => {
      const tableName = process.env.AIRTABLE_TABLE || "Workflows"
      const viewName = process.env.AIRTABLE_VIEW || "Published"

      const records = await base(tableName)
        .select({
          view: viewName,
          maxRecords: 1,
          filterByFormula: "featured = TRUE()",
          sort: [{ field: "publishedAt", direction: "desc" }],
        })
        .firstPage()

      if (!records.length) return null

      const [rec] = records
      return {
        id: rec.id,
        ...(rec.fields as any),
      } as WorkflowData
    })
  } catch (err: any) {
    if (err?.statusCode === 404 || /not find/i.test(err?.message)) {
      console.warn(`[fetchFeatured] Table or view not found – returning null: ${err.message}`)
      return null
    }

    console.error("Error fetching featured workflow:", err)
    return null
  }
}

export const fetchAllWorkflows = async (): Promise<WorkflowData[]> => {
  try {
    return await withRetry(async () => {
      const { AIRTABLE_TABLE, AIRTABLE_VIEW } = process.env

      if (!AIRTABLE_TABLE || !AIRTABLE_VIEW) {
        throw new Error("Missing Airtable table or view configuration")
      }

      const records = await base(AIRTABLE_TABLE)
        .select({
          view: AIRTABLE_VIEW,
          sort: [{ field: "publishedAt", direction: "desc" }],
          pageSize: 100, // Optimize batch size
        })
        .all()

      return records.map((rec) => ({
        id: rec.id,
        ...(rec.fields as any),
      })) as WorkflowData[]
    })
  } catch (error) {
    console.error("Error fetching all workflows:", error)
    return []
  }
}

export const createWorkflow = async (fields: Partial<WorkflowData>) => {
  try {
    return await withRetry(async () => {
      const { AIRTABLE_TABLE } = process.env

      if (!AIRTABLE_TABLE) {
        throw new Error("Missing Airtable table configuration")
      }

      const workflowData = {
        ...fields,
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }

      const records = await base(AIRTABLE_TABLE).create([{ fields: workflowData }])
      console.log("Workflow created successfully:", records[0].id)
      return records[0]
    })
  } catch (error) {
    console.error("Error creating workflow:", error)
    throw error
  }
}
