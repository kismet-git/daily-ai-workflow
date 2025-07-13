"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react"

export function HeroSection() {
  const [currentWorkflow, setCurrentWorkflow] = useState(0)

  const workflows = [
    {
      date: "January 13, 2025",
      title: "AI-Powered Email Segmentation for Higher Conversions",
      description:
        "Use machine learning to automatically segment your email list based on customer behavior, purchase history, and engagement patterns. This workflow can increase email conversion rates by 40% while reducing manual work by 80%.",
      impact: "+40% Conversion Rate",
      difficulty: "Beginner",
      time: "2-3 hours",
    },
    {
      date: "January 12, 2025",
      title: "Dynamic Content Personalization Engine",
      description:
        "Create personalized website experiences that adapt in real-time based on visitor behavior, demographics, and past interactions. This AI-driven approach can boost conversion rates by up to 35%.",
      impact: "+35% Engagement",
      difficulty: "Intermediate",
      time: "4-6 hours",
    },
    {
      date: "January 11, 2025",
      title: "Predictive Customer Lifetime Value Calculator",
      description:
        "Leverage machine learning to predict which customers will be most valuable over time, enabling smarter acquisition spending and retention strategies that can improve ROI by 50%.",
      impact: "+50% ROI",
      difficulty: "Advanced",
      time: "6-8 hours",
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
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div
        className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 mb-8 shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Daily AI Workflow
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight text-gray-900 mb-6 leading-[0.9] tracking-tight">
            <span className="whitespace-nowrap">
              Workflow of the{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-light">
                Day
              </span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl xl:text-2xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            <span className="hidden lg:inline whitespace-nowrap">
              Discover actionable AI marketing strategies that drive real results for modern businesses
            </span>
            <span className="lg:hidden">
              Discover actionable AI marketing strategies that drive real results for modern businesses
            </span>
          </p>

          {/* Workflow Card */}
          <article className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 sm:p-12 shadow-xl shadow-gray-900/5 mb-16 max-w-5xl mx-auto">
            {/* Navigation Controls */}
            <div className="flex items-center justify-between mb-8">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200 rounded-xl px-4 py-2"
                aria-label="Previous workflow"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Previous
              </Button>

              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                <Calendar className="h-5 w-5 text-blue-600" aria-hidden="true" />
                <time className="text-gray-700 font-medium text-lg" dateTime={currentData.date}>
                  {currentData.date}
                </time>
              </div>

              <Button
                variant="ghost"
                onClick={handleNext}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200 rounded-xl px-4 py-2"
                aria-label="Next workflow"
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            {/* Workflow Content */}
            <div className="text-left">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {currentData.impact}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {currentData.difficulty}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {currentData.time}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
                {currentData.title}
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 font-light">
                {currentData.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-blue-600/25 transition-all duration-200"
                  aria-label="Get this AI marketing workflow"
                >
                  Get This Workflow
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 px-8 py-3 rounded-xl font-medium bg-transparent"
                  aria-label="Preview this workflow"
                >
                  View Preview
                </Button>
              </div>
            </div>
          </article>

          {/* Workflow Indicators */}
          <div className="flex justify-center gap-2" role="tablist" aria-label="Workflow navigation">
            {workflows.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentWorkflow(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentWorkflow ? "bg-blue-600 scale-110" : "bg-gray-300 hover:bg-gray-400"
                }`}
                role="tab"
                aria-selected={index === currentWorkflow}
                aria-label={`View workflow ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
