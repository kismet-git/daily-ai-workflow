import { NextResponse } from "next/server"
import { fetchAllWorkflows } from "@/lib/airtable"

export const revalidate = 300
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const workflows = await fetchAllWorkflows()

    return NextResponse.json(workflows, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    })
  } catch (error) {
    console.error("Error in workflows API:", error)
    return NextResponse.json({ error: "Failed to fetch workflows" }, { status: 500 })
  }
}
