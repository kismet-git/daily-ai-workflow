import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import type { WorkflowData } from "@/lib/airtable"

interface HeroSectionProps {
  data?: WorkflowData | null
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-32">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              New AI workflow delivered daily.{" "}
              <a href="#featured" className="font-semibold text-blue-600">
                <span className="absolute inset-0" aria-hidden="true" />
                See today's workflow <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            One AI-powered{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              marketing workflow
            </span>
            , delivered daily
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover actionable AI marketing strategies every day. Built for marketers who want clear, step-by-step
            workflows powered by artificial intelligence.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Sparkles className="mr-2 h-4 w-4" />
              Get Today's Workflow
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button variant="outline" size="lg">
              Browse Library
            </Button>
          </div>

          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src="/placeholder.svg?height=400&width=600&text=Daily+AI+Workflow+Dashboard"
                alt="Daily AI Workflow Dashboard"
                width={600}
                height={400}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
