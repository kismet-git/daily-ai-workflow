import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (body.secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
    }

    // Revalidate the homepage
    revalidatePath("/")

    return NextResponse.json({ revalidated: true })
  } catch (error) {
    console.error("Error revalidating:", error)
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 })
  }
}
