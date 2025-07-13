import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Clock, Target, Zap, DollarSign, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeaturedWorkflow() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-indigo-100/40 to-cyan-100/40 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 mb-6">
              <TrendingUp className="h-4 w-4" />
              Featured Workflow
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-gray-900 mb-6 leading-tight tracking-tight">
              AI-Powered Email Segmentation
              <span className="block text-3xl sm:text-4xl lg:text-5xl text-gray-600 mt-2">for Higher Conversions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your email marketing with machine learning that automatically segments subscribers for 40%
              better conversion rates
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200/50 px-4 py-2 text-sm font-medium shadow-sm">
              <Zap className="h-4 w-4 mr-2" />
              Quick Win
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200/50 px-4 py-2 text-sm font-medium shadow-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              40% Better Results
            </Badge>
            <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200/50 px-4 py-2 text-sm font-medium shadow-sm">
              <DollarSign className="h-4 w-4 mr-2" />
              $12.8B Market
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200/50 px-4 py-2 text-sm font-medium shadow-sm">
              +5 More Benefits
            </Badge>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <Card className="border-0 shadow-lg shadow-gray-900/5 bg-gradient-to-br from-white to-blue-50/30 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">$12.8B</div>
                <div className="text-sm text-gray-600 font-medium">Market Opportunity</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg shadow-gray-900/5 bg-gradient-to-br from-white to-green-50/30 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">8.5/10</div>
                <div className="text-sm text-gray-600 font-medium">Execution Score</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg shadow-gray-900/5 bg-gradient-to-br from-white to-purple-50/30 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">2-3 hrs</div>
                <div className="text-sm text-gray-600 font-medium">Setup Time</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg shadow-gray-900/5 bg-gradient-to-br from-white to-orange-50/30 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">+40%</div>
                <div className="text-sm text-gray-600 font-medium">Conversion Lift</div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-32 -translate-x-32" />

              <div className="relative z-10">
                <h3 className="text-3xl sm:text-4xl font-light mb-4">Ready to transform your email marketing?</h3>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Get instant access to this workflow and start seeing results in the next 2-3 hours
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-xl shadow-lg"
                  >
                    Get Full Workflow
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-medium rounded-xl bg-transparent"
                  >
                    View Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
