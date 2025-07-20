import { NextResponse } from "next/server"
import { fetchWorkflows } from "@/lib/airtable"

export async function GET() {
  try {
    const workflows = await fetchWorkflows()
    return NextResponse.json(workflows)
  } catch (error) {
    console.error("Error fetching workflows:", error)
    return NextResponse.json({ error: "Failed to fetch workflows" }, { status: 500 })
  }
}
