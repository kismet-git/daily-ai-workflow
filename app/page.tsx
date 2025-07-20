import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturedWorkflow } from "@/components/featured-workflow"
import { WorkflowLibrary } from "@/components/workflow-library"
import { TrendsSection } from "@/components/trends-section"
import { WorkflowBreakdown } from "@/components/workflow-breakdown"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />

        <Suspense fallback={<div className="py-20 text-center">Loading featured workflow...</div>}>
          <FeaturedWorkflow />
        </Suspense>

        <WorkflowBreakdown />

        <Suspense fallback={<div className="py-20 text-center">Loading workflow library...</div>}>
          <WorkflowLibrary />
        </Suspense>

        <TrendsSection />
      </main>
      <Footer />
    </div>
  )
}
