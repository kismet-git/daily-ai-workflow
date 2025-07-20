import Airtable from "airtable"

// Initialize Airtable
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!)

export interface WorkflowRecord {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  timeToComplete: string
  tools: string[]
  steps: string[]
  featured: boolean
  used?: boolean
  createdAt: string
}

export async function fetchWorkflows(): Promise<WorkflowRecord[]> {
  try {
    const records = await base(process.env.AIRTABLE_TABLE!)
      .select({
        view: process.env.AIRTABLE_VIEW!,
        maxRecords: 100,
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      title: record.get("title") as string,
      description: record.get("description") as string,
      category: record.get("category") as string,
      difficulty: record.get("difficulty") as string,
      timeToComplete: record.get("timeToComplete") as string,
      tools: (record.get("tools") as string)?.split(",").map((tool) => tool.trim()) || [],
      steps: (record.get("steps") as string)?.split("\n").filter(Boolean) || [],
      featured: (record.get("featured") as boolean) || false,
      used: (record.get("used") as boolean) || false,
      createdAt: (record.get("createdAt") as string) || new Date().toISOString(),
    }))
  } catch (error) {
    console.error("Error fetching workflows:", error)
    throw new Error("Failed to fetch workflows")
  }
}

export async function fetchFeatured(): Promise<WorkflowRecord | null> {
  try {
    const records = await base(process.env.AIRTABLE_TABLE!)
      .select({
        filterByFormula: "{featured} = TRUE()",
        maxRecords: 1,
        sort: [{ field: "createdAt", direction: "desc" }],
      })
      .all()

    if (records.length === 0) {
      return null
    }

    const record = records[0]
    return {
      id: record.id,
      title: record.get("title") as string,
      description: record.get("description") as string,
      category: record.get("category") as string,
      difficulty: record.get("difficulty") as string,
      timeToComplete: record.get("timeToComplete") as string,
      tools: (record.get("tools") as string)?.split(",").map((tool) => tool.trim()) || [],
      steps: (record.get("steps") as string)?.split("\n").filter(Boolean) || [],
      featured: true,
      used: (record.get("used") as boolean) || false,
      createdAt: (record.get("createdAt") as string) || new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error fetching featured workflow:", error)
    return null
  }
}

export async function pickTopic(): Promise<WorkflowRecord | null> {
  try {
    const records = await base("Backlog")
      .select({
        filterByFormula: "{used} != TRUE()",
        maxRecords: 10,
      })
      .all()

    if (records.length === 0) {
      console.log("No unused topics found")
      return null
    }

    // Pick a random topic
    const randomIndex = Math.floor(Math.random() * records.length)
    const selectedRecord = records[randomIndex]

    // Mark as used
    await base("Backlog").update([
      {
        id: selectedRecord.id,
        fields: {
          used: true,
        },
      },
    ])

    return {
      id: selectedRecord.id,
      title: selectedRecord.get("title") as string,
      description: selectedRecord.get("description") as string,
      category: selectedRecord.get("category") as string,
      difficulty: selectedRecord.get("difficulty") as string,
      timeToComplete: selectedRecord.get("timeToComplete") as string,
      tools: (selectedRecord.get("tools") as string)?.split(",").map((tool) => tool.trim()) || [],
      steps: (selectedRecord.get("steps") as string)?.split("\n").filter(Boolean) || [],
      featured: false,
      used: true,
      createdAt: (selectedRecord.get("createdAt") as string) || new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error picking topic:", error)
    return null
  }
}
