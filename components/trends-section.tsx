import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export function TrendsSection() {
  const trends = [
    {
      title: "AI Video Generation",
      growth: "+156%",
      isPositive: true,
      summary: "AI-powered video creation tools are revolutionizing content marketing with 3x faster production times.",
    },
    {
      title: "Voice Search Optimization",
      growth: "+89%",
      isPositive: true,
      summary: "Voice search queries are growing rapidly, requiring new SEO strategies and content approaches.",
    },
    {
      title: "Predictive Analytics",
      growth: "+134%",
      isPositive: true,
      summary: "Marketers are using AI to predict customer behavior and optimize campaigns before launch.",
    },
    {
      title: "Chatbot Integration",
      growth: "+67%",
      isPositive: true,
      summary: "Advanced AI chatbots are handling 70% of customer inquiries while improving satisfaction.",
    },
    {
      title: "Personalization Engines",
      growth: "+201%",
      isPositive: true,
      summary: "Real-time personalization is becoming standard, with AI delivering unique experiences at scale.",
    },
    {
      title: "Automated Reporting",
      growth: "+78%",
      isPositive: true,
      summary: "AI-generated marketing reports are saving teams 15+ hours per week while improving accuracy.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading text-center">Trending in AI Marketing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay ahead of the curve with the latest AI marketing trends and opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trends.map((trend, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{trend.title}</span>
                  <div
                    className={`flex items-center space-x-1 ${trend.isPositive ? "text-green-600" : "text-red-600"}`}
                  >
                    {trend.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="font-bold">{trend.growth}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Chart placeholder */}
                <div className="h-24 bg-gradient-to-r from-blue-50 to-purple-50 rounded mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 opacity-50" />
                </div>

                <p className="text-gray-600 text-sm flex-1">{trend.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            Explore All Trends
          </Button>
        </div>
      </div>
    </section>
  )
}
