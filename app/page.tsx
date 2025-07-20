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
    featuredWorkflow = await fetchFeatured()
  } catch (error) {
    console.error("Failed to fetch featured workflow:", error)
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
