import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedWorkflow } from "@/components/featured-workflow"
import { WorkflowBreakdown } from "@/components/workflow-breakdown"
import { WorkflowLibrary } from "@/components/workflow-library"
import { TrendsSection } from "@/components/trends-section"
import { Footer } from "@/components/footer"
import { fetchFeatured } from "@/lib/airtable"
import { unstable_cache } from "next/cache"

// Cache the featured workflow data
const getCachedFeaturedWorkflow = unstable_cache(async () => fetchFeatured(), ["featured-workflow"], {
  tags: ["home"],
  revalidate: 30,
})

export const revalidate = 30 // ISR - revalidate every 30 seconds

export default async function HomePage() {
  const featuredWorkflow = await getCachedFeaturedWorkflow()

  if (!featuredWorkflow) {
    // Fallback to static content if no workflow is available
    return (
      <>
        <Header />
        <main role="main">
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Daily AI Workflow</h1>
              <p className="text-xl text-gray-600 mb-8">No workflow available today. Check back soon!</p>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main role="main">
        <HeroSection data={featuredWorkflow} />
        <FeaturedWorkflow data={featuredWorkflow} />
        <WorkflowBreakdown data={featuredWorkflow} />
        <WorkflowLibrary />
        <TrendsSection />
      </main>
      <Footer />
    </>
  )
}
