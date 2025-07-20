import Airtable from "airtable"

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  throw new Error("Missing required Airtable environment variables")
}

export const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID as string)

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

export const fetchFeatured = async (): Promise<WorkflowData | null> => {
  try {
    // 1️⃣  Figure out which table + view to query, with sane defaults
    const tableName = process.env.AIRTABLE_TABLE || "Workflows"
    const viewName = process.env.AIRTABLE_VIEW || "Published"

    // 2️⃣  Attempt to get the most-recent featured (or first) record
    const records = await base(process.env.AIRTABLE_TABLE!)
      .select({
        view: process.env.AIRTABLE_VIEW,
        maxRecords: 1,
      })
      .firstPage()

    // 3️⃣  Return null (not an error) if nothing found
    if (!records.length) return null

    const [rec] = records

    return {
      id: rec.id,
      ...(rec.fields as any),
    } as WorkflowData
  } catch (err: any) {
    /*  
      Airtable throws a NOT_FOUND error when the table or view
      doesn’t exist (“Could not find what you are looking for”).
      We treat that as “no data” instead of crashing the app.
    */
    if (err?.statusCode === 404 || /not find/i.test(err?.message)) {
      console.warn(`[fetchFeatured] Table or view not found – returning null instead of error: ${err.message}`)
      return null
    }

    console.error("Error fetching featured workflow:", err)
    return null
  }
}

export const fetchAllWorkflows = async (): Promise<WorkflowData[]> => {
  try {
    const { AIRTABLE_TABLE, AIRTABLE_VIEW } = process.env

    if (!AIRTABLE_TABLE || !AIRTABLE_VIEW) {
      throw new Error("Missing Airtable table or view configuration")
    }

    const records = await base(AIRTABLE_TABLE)
      .select({
        view: AIRTABLE_VIEW,
        sort: [{ field: "publishedAt", direction: "desc" }],
      })
      .all()

    return records.map((rec) => ({
      id: rec.id,
      ...(rec.fields as any),
    })) as WorkflowData[]
  } catch (error) {
    console.error("Error fetching all workflows:", error)
    return []
  }
}

export const createWorkflow = async (fields: Partial<WorkflowData>) => {
  try {
    const { AIRTABLE_TABLE } = process.env

    if (!AIRTABLE_TABLE) {
      throw new Error("Missing Airtable table configuration")
    }

    // Add timestamp
    const workflowData = {
      ...fields,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    const records = await base(AIRTABLE_TABLE).create([{ fields: workflowData }])

    console.log("Workflow created successfully:", records[0].id)
    return records[0]
  } catch (error) {
    console.error("Error creating workflow:", error)
    throw error
  }
}

export const updateWorkflow = async (id: string, fields: Partial<WorkflowData>) => {
  try {
    const { AIRTABLE_TABLE } = process.env

    if (!AIRTABLE_TABLE) {
      throw new Error("Missing Airtable table configuration")
    }

    const records = await base(AIRTABLE_TABLE).update([
      { id, fields: { ...fields, updatedAt: new Date().toISOString() } },
    ])

    console.log("Workflow updated successfully:", records[0].id)
    return records[0]
  } catch (error) {
    console.error("Error updating workflow:", error)
    throw error
  }
}
