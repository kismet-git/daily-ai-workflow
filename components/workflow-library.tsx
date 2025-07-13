import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

export function WorkflowLibrary() {
  const workflows = [
    {
      title: "AI Content Calendar Generator",
      tags: ["Content Marketing", "Social Media", "Quick Win"],
      description: "Generate 30 days of social content in 10 minutes using AI prompts and templates.",
    },
    {
      title: "Predictive Lead Scoring",
      tags: ["Lead Generation", "$5M+ Market", "Advanced"],
      description: "Use machine learning to identify your highest-value prospects automatically.",
    },
    {
      title: "Dynamic Pricing Optimization",
      tags: ["E-commerce", "Revenue", "Automation"],
      description: "AI-powered pricing that adjusts based on demand, competition, and customer behavior.",
    },
    {
      title: "Chatbot Customer Journey",
      tags: ["Customer Service", "Conversion", "Quick Win"],
      description: "Build an AI chatbot that guides customers through your sales funnel.",
    },
    {
      title: "Sentiment Analysis Dashboard",
      tags: ["Brand Monitoring", "Analytics", "Insights"],
      description: "Track brand sentiment across social media and review platforms in real-time.",
    },
    {
      title: "Automated A/B Testing",
      tags: ["Optimization", "Testing", "Advanced"],
      description: "Let AI run and optimize your A/B tests automatically for maximum performance.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Workflow Library</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of proven AI marketing workflows, each designed to solve specific business challenges
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {workflows.map((workflow, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{workflow.title}</CardTitle>
                <div className="flex flex-wrap gap-1">
                  {workflow.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-gray-600 mb-4 flex-1">{workflow.description}</p>

                {/* Mini chart placeholder */}
                <div className="h-16 bg-gradient-to-r from-green-50 to-blue-50 rounded mb-4 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600 opacity-50" />
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  View Workflow
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg">Browse All Workflows</Button>
        </div>
      </div>
    </section>
  )
}
