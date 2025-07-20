import { type NextRequest, NextResponse } from "next/server"
import { pickTopic } from "@/lib/airtable"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("Starting daily workflow generation...")

    // Pick a random topic from backlog
    const topic = await pickTopic()
    if (!topic) {
      console.log("No topics available")
      return NextResponse.json({ message: "No topics available" }, { status: 200 })
    }

    console.log("Selected topic:", topic.title)

    // Generate workflow content using AI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an expert marketing strategist. Create a detailed, actionable AI-powered marketing workflow based on the given topic. 

Format your response as a JSON object with these fields:
- title: A compelling title for the workflow
- description: A brief description (2-3 sentences)
- category: The marketing category (e.g., "Content Marketing", "Social Media", "Email Marketing")
- difficulty: "Beginner", "Intermediate", or "Advanced"
- timeToComplete: Estimated time (e.g., "30 minutes", "2 hours")
- tools: Array of AI tools/platforms needed
- steps: Array of detailed step-by-step instructions

Make it practical and actionable for marketers.`,
      prompt: `Create a marketing workflow for: ${topic.title}\n\nDescription: ${topic.description}`,
    })

    console.log("Generated workflow content")

    // Parse the AI response
    let workflowData
    try {
      workflowData = JSON.parse(text)
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 })
    }

    // Here you would typically save the generated workflow to your database
    // For now, we'll just log it
    console.log("Generated workflow:", workflowData)

    // Trigger revalidation of the homepage
    const revalidateUrl = `${process.env.VERCEL_URL || "http://localhost:3000"}/api/revalidate`
    try {
      await fetch(revalidateUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret: process.env.REVALIDATE_SECRET }),
      })
      console.log("Homepage revalidated")
    } catch (revalidateError) {
      console.error("Failed to revalidate:", revalidateError)
    }

    return NextResponse.json({
      message: "Daily workflow generated successfully",
      topic: topic.title,
      workflow: workflowData,
    })
  } catch (error) {
    console.error("Error in daily workflow cron:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
