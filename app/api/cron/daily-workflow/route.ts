import { type NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE || "Backlog"
const AIRTABLE_VIEW = process.env.AIRTABLE_VIEW || "Grid view"

interface AirtableRecord {
  id: string
  fields: {
    title?: string
    description?: string
    category?: string
    difficulty?: string
    timeToComplete?: string
    tools?: string[]
    used?: boolean
  }
}

interface AirtableResponse {
  records: AirtableRecord[]
}

async function fetchUnusedWorkflows(): Promise<AirtableRecord[]> {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}?view=${encodeURIComponent(AIRTABLE_VIEW)}&filterByFormula=NOT({used})`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Airtable API error: ${response.status} ${response.statusText}`)
  }

  const data: AirtableResponse = await response.json()
  return data.records
}

async function pickTopic(): Promise<AirtableRecord | null> {
  try {
    const records = await fetchUnusedWorkflows()

    if (records.length === 0) {
      console.log("No unused workflows found")
      return null
    }

    // Pick a random record
    const randomIndex = Math.floor(Math.random() * records.length)
    const selectedRecord = records[randomIndex]

    // Mark as used
    const updateUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}`

    await fetch(updateUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            id: selectedRecord.id,
            fields: {
              used: true,
            },
          },
        ],
      }),
    })

    return selectedRecord
  } catch (error) {
    console.error("Error in pickTopic:", error)
    throw error
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify the request is authorized (check for cron secret or other auth)
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("Starting daily workflow cron job...")

    const selectedWorkflow = await pickTopic()

    if (!selectedWorkflow) {
      return NextResponse.json({
        success: true,
        message: "No unused workflows available",
        workflow: null,
      })
    }

    // Revalidate the cache for the featured workflow
    revalidateTag("featured-workflow")

    console.log("Daily workflow cron job completed successfully")

    return NextResponse.json({
      success: true,
      message: "Daily workflow updated successfully",
      workflow: {
        id: selectedWorkflow.id,
        title: selectedWorkflow.fields.title,
        category: selectedWorkflow.fields.category,
      },
    })
  } catch (error) {
    console.error("Daily workflow cron job failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
