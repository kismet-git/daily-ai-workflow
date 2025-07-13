"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

export function HeroSection() {
  const [currentWorkflow, setCurrentWorkflow] = useState(0)

  const workflows = [
    {
      date: "January 13, 2025",
      title: "AI-Powered Email Segmentation for Higher Conversions",
      description:
        "Use machine learning to automatically segment your email list based on customer behavior, purchase history, and engagement patterns. This workflow can increase email conversion rates by 40% while reducing manual work by 80%.",
    },
    {
      date: "January 12, 2025",
      title: "Dynamic Content Personalization Engine",
      description:
        "Create personalized website experiences that adapt in real-time based on visitor behavior, demographics, and past interactions. This AI-driven approach can boost conversion rates by up to 35%.",
    },
    {
      date: "January 11, 2025",
      title: "Predictive Customer Lifetime Value Calculator",
      description:
        "Leverage machine learning to predict which customers will be most valuable over time, enabling smarter acquisition spending and retention strategies that can improve ROI by 50%.",
    },
  ]

  const handlePrevious = () => {
    setCurrentWorkflow((prev) => (prev === 0 ? workflows.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentWorkflow((prev) => (prev === workflows.length - 1 ? 0 : prev + 1))
  }

  const currentData = workflows[currentWorkflow]

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 mb-4 leading-tight tracking-tight">
            Workflow of the Day
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-20 max-w-3xl mx-auto leading-relaxed">
            Discover actionable AI marketing strategies that drive real results
          </p>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-12 mb-20">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 font-medium text-lg">{currentData.date}</span>
            </div>

            <Button
              variant="ghost"
              onClick={handleNext}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Next Workflow
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
