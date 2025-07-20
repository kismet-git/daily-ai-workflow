import { type NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get("x-vercel-revalidate-secret")
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get("tag")

    // Verify the secret
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Invalid revalidation secret" }, { status: 401 })
    }

    if (!tag) {
      return NextResponse.json({ error: "Missing tag parameter" }, { status: 400 })
    }

    // Revalidate the specified tag
    revalidateTag(tag)

    console.log(`Revalidated tag: ${tag}`)

    return NextResponse.json({
      revalidated: true,
      tag,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in revalidate API:", error)
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 })
  }
}
