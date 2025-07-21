import { HeroSection } from "@/components/hero-section"
import { FeaturedWorkflow } from "@/components/featured-workflow"
import { WorkflowLibrary } from "@/components/workflow-library"
import { TrendsSection } from "@/components/trends-section"
import { WorkflowBreakdown } from "@/components/workflow-breakdown"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { fetchFeatured } from "@/lib/airtable"

export const revalidate = 300

export default async function HomePage() {
  let featuredWorkflow = null

  try {
    // Only attempt to fetch if we have the required environment variables
    if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      featuredWorkflow = await fetchFeatured()
    } else {
      console.warn("Airtable environment variables not configured, using fallback data")
    }
  } catch (error) {
    console.error("Failed to fetch featured workflow:", error)
    // Continue with null data - components will use fallbacks
  }

  return (
    <main>
      <Header />
      <HeroSection data={featuredWorkflow} />
      <FeaturedWorkflow data={featuredWorkflow} />
      <WorkflowBreakdown data={featuredWorkflow} />
      <WorkflowLibrary />
      <TrendsSection />
      <Footer />
    </main>
  )
}
