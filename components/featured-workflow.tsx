import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Clock, Target, Zap, DollarSign } from "lucide-react"

export function FeaturedWorkflow() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Workflow Title */}
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight tracking-tight">
              AI-Powered Email Segmentation for Higher Conversions
              <span className="block text-2xl sm:text-3xl text-gray-600 mt-4 font-normal">($12.8B+ opportunity)</span>
            </h2>

            {/* Tags */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 px-4 py-2 text-sm font-medium">
                <Zap className="h-4 w-4 mr-2" />
                Quick Win
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-2 text-sm font-medium">
                <TrendingUp className="h-4 w-4 mr-2" />
                40% Better Results
              </Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium">
                <DollarSign className="h-4 w-4 mr-2" />
                High ROI Market
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2 text-sm font-medium">+5 More</Badge>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-xl max-w-none mb-16">
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-8 font-light">
              Most health-conscious business travelers abandon their fitness routines when faced with disappointing
              hotel gyms and jet lag. This AI-powered email segmentation system combines behavioral analysis with
              predictive modeling to automatically categorize your subscribers based on engagement patterns, purchase
              history, and interaction preferences.
            </p>

            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-12 font-light">
              The system analyzes over 50 data points per subscriber to create dynamic segments that update in
              real-time, enabling personalized email campaigns that convert 40% better than traditional
              demographic-based segmentation. Implementation takes 2-3 hours with ongoing optimization handled
              automatically by machine learning algorithms.
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="border-0 shadow-sm bg-gray-50">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">$12.8B</div>
                <div className="text-sm text-gray-600">Market Size</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gray-50">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">8.5/10</div>
                <div className="text-sm text-gray-600">Execution Score</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gray-50">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">2-3 hrs</div>
                <div className="text-sm text-gray-600">Setup Time</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gray-50">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">+40%</div>
                <div className="text-sm text-gray-600">Conversion Lift</div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Information */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-10 mb-12">
            <div className="max-w-4xl">
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">Implementation Investment</h3>
              <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                At <span className="font-bold text-blue-600">$299 for the complete setup</span> and{" "}
                <span className="font-bold text-blue-600">$49/month</span> for the AI segmentation platform, you're
                targeting the $12.8 billion email marketing automation market with a focus on mid-market businesses
                spending $5,000+ monthly on email campaigns.
              </p>
              <p className="text-gray-600">
                The total addressable market includes 2.3M+ businesses currently using basic email segmentation, with
                67% reporting dissatisfaction with their current targeting accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
