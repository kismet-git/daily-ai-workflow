import { NextResponse } from "next/server"
import { fetchFeatured } from "@/lib/airtable"

export async function GET() {
  try {
    const featured = await fetchFeatured()

    if (!featured) {
      return NextResponse.json({ error: "No featured workflow found" }, { status: 404 })
    }

    return NextResponse.json(featured)
  } catch (error) {
    console.error("Error fetching featured workflow:", error)
    return NextResponse.json({ error: "Failed to fetch featured workflow" }, { status: 500 })
  }
}
