import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Clock, Target } from "lucide-react"

export function FeaturedWorkflow() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  AI-Powered Email Segmentation for Higher Conversions
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Use machine learning to automatically segment your email list based on customer behavior, purchase
                  history, and engagement patterns. This workflow can increase email conversion rates by 40% while
                  reducing manual work by 80%.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">Email Campaign</Badge>
                  <Badge variant="secondary">$10M+ Market</Badge>
                  <Badge variant="secondary">Quick Win</Badge>
                  <Badge variant="secondary">Automation</Badge>
                </div>
              </div>

              {/* Trend Graph Placeholder */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Performance Trend</h3>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">+24% this month</span>
                    </div>
                  </div>
                  <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Trend visualization placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <Button className="w-full mb-6" size="lg">
                  Build This Workflow
                </Button>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Market Size</span>
                    </div>
                    <span className="font-semibold">$12.8B</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Execution Score</span>
                    </div>
                    <span className="font-semibold text-green-600">8.5/10</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Time to Setup</span>
                    </div>
                    <span className="font-semibold">2-3 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Related Categories</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-left">
                    Email Marketing
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    Customer Segmentation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    Marketing Automation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    AI Tools
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
