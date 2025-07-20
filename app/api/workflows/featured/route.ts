import { NextResponse } from "next/server"
import { fetchFeatured } from "@/lib/airtable"

export const revalidate = 30 // Cache for 30 seconds
export const dynamic = "force-dynamic" // Ensure fresh data

export async function GET() {
  try {
    const data = await fetchFeatured()

    if (!data) {
      return NextResponse.json({ error: "No featured workflow found" }, { status: 404 })
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    })
  } catch (error) {
    console.error("Error in featured workflow API:", error)
    return NextResponse.json({ error: "Failed to fetch featured workflow" }, { status: 500 })
  }
}
