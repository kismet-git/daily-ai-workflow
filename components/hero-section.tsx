import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function HeroSection() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Marketing Workflow of the Day
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8">One powerful AI marketing workflow. Delivered daily.</p>

          <div className="flex items-center justify-center space-x-2 text-gray-500 mb-8">
            <Calendar className="h-5 w-5" />
            <span className="text-lg">{today}</span>
          </div>

          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Today's workflow: Build a personalized email sequence that converts 40% better using AI-powered customer
            segmentation
          </p>

          <Button size="lg" className="text-lg px-8 py-3">
            See Full Workflow
          </Button>
        </div>
      </div>
    </section>
  )
}
