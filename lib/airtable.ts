import Airtable from "airtable"

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env

// Only initialize Airtable if we have the required environment variables
let base: any = null

if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
  try {
    base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID as string)
  } catch (error) {
    console.error("Failed to initialize Airtable:", error)
  }
}

export { base }

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

const withRetry = async (operation: () => Promise<any>, maxRetries = 3): Promise<any> => {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      console.warn(`Attempt ${attempt} failed:`, error)

      if (attempt === maxRetries) break

      // Exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}

export const fetchFeatured = async (): Promise<WorkflowData | null> => {
  // Return null if Airtable is not configured
  if (!base) {
    console.warn("Airtable not configured, returning null")
    return null
  }

  try {
    const tableName = process.env.AIRTABLE_TABLE || "Workflows"
    const viewName = process.env.AIRTABLE_VIEW || "Published"

    let records: Airtable.Record<{}>[] = []

    try {
      // Primary attempt – use configured view
      records = await withRetry(() =>
        base(tableName)
          .select({
            view: viewName,
            maxRecords: 1,
          })
          .firstPage(),
      )
    } catch (err: any) {
      // If the view or table wasn't found, silently fall back to "no-view" query
      if (
        err?.statusCode === 422 || // Airtable "Unprocessable Entity"
        err?.statusCode === 404 ||
        /could\s*not\s*find/i.test(err?.message ?? "")
      ) {
        console.warn(`[fetchFeatured] View "${viewName}" not found – falling back to first record in table`)
        records = await withRetry(() =>
          base(tableName)
            .select({
              maxRecords: 1,
              sort: [{ field: "createdAt", direction: "desc" }],
            })
            .firstPage(),
        )
      } else {
        throw err
      }
    }

    if (!records.length) return null

    const [rec] = records

    return {
      id: rec.id,
      ...(rec.fields as any),
    } as WorkflowData
  } catch (err: any) {
    // Airtable returns plain-text 404 strings like "Could not find what you are looking for".
    if (err?.statusCode === 404 || /not\s+find|could\s+not\s+find/i.test(err?.message ?? "")) {
      console.warn(`[fetchFeatured] Table or view not found – returning null: ${err.message}`)
      return null
    }

    console.error("Error fetching featured workflow:", err)
    return null
  }
}

export const fetchAllWorkflows = async (): Promise<WorkflowData[]> => {
  // Return empty array if Airtable is not configured
  if (!base) {
    console.warn("Airtable not configured, returning empty array")
    return []
  }

  try {
    const { AIRTABLE_TABLE, AIRTABLE_VIEW } = process.env

    if (!AIRTABLE_TABLE || !AIRTABLE_VIEW) {
      console.warn("Missing Airtable table or view configuration")
      return []
    }

    let records: Airtable.Record<{}>[] = []
    try {
      records = await withRetry(() =>
        base(AIRTABLE_TABLE)
          .select({
            view: AIRTABLE_VIEW,
            sort: [{ field: "publishedAt", direction: "desc" }],
          })
          .all(),
      )
    } catch (err: any) {
      if (err?.statusCode === 422 || err?.statusCode === 404 || /could\s*not\s*find/i.test(err?.message ?? "")) {
        console.warn(`[fetchAllWorkflows] View "${AIRTABLE_VIEW}" not found – returning all records without a view`)
        records = await withRetry(() =>
          base(AIRTABLE_TABLE)
            .select({
              sort: [{ field: "createdAt", direction: "desc" }],
            })
            .all(),
        )
      } else {
        throw err
      }
    }

    return records.map((rec) => ({
      id: rec.id,
      ...(rec.fields as any),
    })) as WorkflowData[]
  } catch (error) {
    if ((error as any)?.statusCode === 404 || /not\s+find|could\s+not\s+find/i.test((error as Error).message)) {
      console.warn("[fetchAllWorkflows] Table or view not found – returning empty list")
      return []
    }
    console.error("Error fetching workflows:", error)
    return []
  }
}

export const createWorkflow = async (fields: Partial<WorkflowData>) => {
  if (!base) {
    throw new Error("Airtable not configured")
  }

  try {
    const { AIRTABLE_TABLE } = process.env

    if (!AIRTABLE_TABLE) {
      throw new Error("Missing Airtable table configuration")
    }

    const workflowData = {
      ...fields,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    const records = await withRetry(() => {
      return base(AIRTABLE_TABLE).create([{ fields: workflowData }])
    })

    console.log("Workflow created successfully:", records[0].id)
    return records[0]
  } catch (error) {
    console.error("Error creating workflow:", error)
    throw error
  }
}

export const updateWorkflow = async (id: string, fields: Partial<WorkflowData>) => {
  if (!base) {
    throw new Error("Airtable not configured")
  }

  try {
    const { AIRTABLE_TABLE } = process.env

    if (!AIRTABLE_TABLE) {
      throw new Error("Missing Airtable table configuration")
    }

    const records = await withRetry(() => {
      return base(AIRTABLE_TABLE).update([{ id, fields: { ...fields, updatedAt: new Date().toISOString() } }])
    })

    console.log("Workflow updated successfully:", records[0].id)
    return records[0]
  } catch (error) {
    console.error("Error updating workflow:", error)
    throw error
  }
}
