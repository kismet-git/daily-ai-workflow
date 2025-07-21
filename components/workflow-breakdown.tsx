import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, TrendingUp, Target, CheckCircle } from "lucide-react"
import type { WorkflowData } from "@/lib/airtable"

interface WorkflowBreakdownProps {
  data?: WorkflowData | null
}

export function WorkflowBreakdown({ data }: WorkflowBreakdownProps) {
  const workflow = data || {
    why: "Email marketing remains one of the highest ROI channels, but generic campaigns are losing effectiveness. Personalized, AI-driven segmentation can increase open rates by 26% and click-through rates by 14%.",
    signals:
      "Leading brands like Netflix and Amazon have proven that AI-powered personalization drives revenue. Small businesses can now access similar technology through affordable AI tools and platforms.",
    opportunity:
      "Most marketers still use basic demographic segmentation. By implementing behavioral AI segmentation, you can outperform 80% of competitors while automating the process.",
    executionPlan:
      "Set up customer data collection, choose an AI segmentation tool, create dynamic email templates, and launch automated campaigns. Full implementation takes 2-3 hours with ongoing optimization.",
  }

  const sections = [
    {
      icon: Lightbulb,
      title: "Why This Matters",
      content: workflow.why,
    },
    {
      icon: TrendingUp,
      title: "Signals from the Market",
      content: workflow.signals,
    },
    {
      icon: Target,
      title: "The Opportunity",
      content: workflow.opportunity,
    },
    {
      icon: CheckCircle,
      title: "Execution Plan",
      content: workflow.executionPlan,
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading text-center">Workflow Breakdown Preview</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to understand and implement this AI marketing workflow
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {sections.map((section, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <section.icon className="h-6 w-6 text-blue-600" />
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            Read Full Breakdown
          </Button>
        </div>
      </div>
    </section>
  )
}
