import { HeroSection } from "@/components/hero-section"
import { FeaturedWorkflow } from "@/components/featured-workflow"
import { WorkflowLibrary } from "@/components/workflow-library"
import { TrendsSection } from "@/components/trends-section"
import { WorkflowBreakdown } from "@/components/workflow-breakdown"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { getFeaturedWorkflow } from "@/lib/fallback-data"

export const revalidate = 300

export default async function HomePage() {
  const featuredWorkflow = getFeaturedWorkflow()

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
