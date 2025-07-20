import Airtable from "airtable"

// Initialize Airtable
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!)

export interface WorkflowRecord {
  id: string
  fields: {
    title: string
    description: string
    category: string
    tools: string[]
    difficulty: "Beginner" | "Intermediate" | "Advanced"
    timeToComplete: string
    featured?: boolean
    used?: boolean
    publishedAt?: string
    author?: string
    tags?: string[]
    steps?: string[]
    benefits?: string[]
    useCases?: string[]
    imageUrl?: string
  }
}

// Retry logic with exponential backoff
export const withRetry = async <T>(\
  operation: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000\
)
: Promise<T> =>
{
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error

      if (attempt === maxRetries) {
        throw lastError
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}

export async function fetchWorkflows(): Promise<WorkflowRecord[]> {
  return withRetry(async () => {
    const records = await base("Workflows")
      .select({
        view: process.env.AIRTABLE_VIEW || "Grid view",
        maxRecords: 100,
        sort: [{ field: "publishedAt", direction: "desc" }],
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: {
        title: (record.fields.title as string) || "",
        description: (record.fields.description as string) || "",
        category: (record.fields.category as string) || "General",
        tools: Array.isArray(record.fields.tools)
          ? (record.fields.tools as string[])
          : typeof record.fields.tools === "string"
            ? [record.fields.tools]
            : [],
        difficulty: (record.fields.difficulty as "Beginner" | "Intermediate" | "Advanced") || "Beginner",
        timeToComplete: (record.fields.timeToComplete as string) || "30 minutes",
        featured: Boolean(record.fields.featured),
        used: Boolean(record.fields.used),
        publishedAt: record.fields.publishedAt as string,
        author: record.fields.author as string,
        tags: Array.isArray(record.fields.tags)
          ? (record.fields.tags as string[])
          : typeof record.fields.tags === "string"
            ? [record.fields.tags]
            : [],
        steps: Array.isArray(record.fields.steps) ? (record.fields.steps as string[]) : [],
        benefits: Array.isArray(record.fields.benefits) ? (record.fields.benefits as string[]) : [],
        useCases: Array.isArray(record.fields.useCases) ? (record.fields.useCases as string[]) : [],
        imageUrl: record.fields.imageUrl as string,
      },
    }))
  })
}

export async function fetchFeatured(): Promise<WorkflowRecord[]> {
  return withRetry(async () => {
    const records = await base("Workflows")
      .select({
        filterByFormula: "{featured} = TRUE()",
        maxRecords: 6,
        sort: [{ field: "publishedAt", direction: "desc" }],
      })
      .all()

    return records.map((record) => ({
      id: record.id,
      fields: {
        title: (record.fields.title as string) || "",
        description: (record.fields.description as string) || "",
        category: (record.fields.category as string) || "General",
        tools: Array.isArray(record.fields.tools)
          ? (record.fields.tools as string[])
          : typeof record.fields.tools === "string"
            ? [record.fields.tools]
            : [],
        difficulty: (record.fields.difficulty as "Beginner" | "Intermediate" | "Advanced") || "Beginner",
        timeToComplete: (record.fields.timeToComplete as string) || "30 minutes",
        featured: Boolean(record.fields.featured),
        used: Boolean(record.fields.used),
        publishedAt: record.fields.publishedAt as string,
        author: record.fields.author as string,
        tags: Array.isArray(record.fields.tags)
          ? (record.fields.tags as string[])
          : typeof record.fields.tags === "string"
            ? [record.fields.tags]
            : [],
        steps: Array.isArray(record.fields.steps) ? (record.fields.steps as string[]) : [],
        benefits: Array.isArray(record.fields.benefits) ? (record.fields.benefits as string[]) : [],
        useCases: Array.isArray(record.fields.useCases) ? (record.fields.useCases as string[]) : [],
        imageUrl: record.fields.imageUrl as string,
      },
    }))
  })
}

export async function pickTopic(): Promise<WorkflowRecord | null> {
  return withRetry(async () => {
    // Get unused records from Backlog table
    const records = await base("Backlog")
      .select({
        filterByFormula: "NOT({used})",
        maxRecords: 10,
        sort: [{ field: "priority", direction: "desc" }],
      })
      .all()

    if (records.length === 0) {
      return null
    }

    // Pick a random record
    const randomRecord = records[Math.floor(Math.random() * records.length)]

    // Mark as used
    await base("Backlog").update([
      {
        id: randomRecord.id,
        fields: { used: true },
      },
    ])

    return {
      id: randomRecord.id,
      fields: {
        title: (randomRecord.fields.title as string) || "",
        description: (randomRecord.fields.description as string) || "",
        category: (randomRecord.fields.category as string) || "General",
        tools: Array.isArray(randomRecord.fields.tools)
          ? (randomRecord.fields.tools as string[])
          : typeof randomRecord.fields.tools === "string"
            ? [randomRecord.fields.tools]
            : [],
        difficulty: (randomRecord.fields.difficulty as "Beginner" | "Intermediate" | "Advanced") || "Beginner",
        timeToComplete: (randomRecord.fields.timeToComplete as string) || "30 minutes",
        featured: Boolean(randomRecord.fields.featured),
        used: Boolean(randomRecord.fields.used),
        publishedAt: randomRecord.fields.publishedAt as string,
        author: randomRecord.fields.author as string,
        tags: Array.isArray(randomRecord.fields.tags)
          ? (randomRecord.fields.tags as string[])
          : typeof randomRecord.fields.tags === "string"
            ? [randomRecord.fields.tags]
            : [],
        steps: Array.isArray(randomRecord.fields.steps) ? (randomRecord.fields.steps as string[]) : [],
        benefits: Array.isArray(randomRecord.fields.benefits) ? (randomRecord.fields.benefits as string[]) : [],
        useCases: Array.isArray(randomRecord.fields.useCases) ? (randomRecord.fields.useCases as string[]) : [],
        imageUrl: randomRecord.fields.imageUrl as string,
      },
    }
  })
}
