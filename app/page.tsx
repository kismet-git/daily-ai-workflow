import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedWorkflow } from "@/components/featured-workflow"
import { WorkflowBreakdown } from "@/components/workflow-breakdown"
import { WorkflowLibrary } from "@/components/workflow-library"
import { TrendsSection } from "@/components/trends-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Header />
      <main role="main">
        <HeroSection />
        <FeaturedWorkflow />
        <WorkflowBreakdown />
        <WorkflowLibrary />
        <TrendsSection />
      </main>
      <Footer />
    </>
  )
}
