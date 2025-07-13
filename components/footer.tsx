import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Get a daily AI workflow in your inbox</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join 25,000+ marketers who start their day with actionable AI workflows. No spam, just practical strategies
            you can implement today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="bg-white text-gray-900" />
            <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/dailyaiworkflow-icon.png"
                  alt="Daily AI Workflow"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <span className="text-xl font-bold">Daily AI Workflow</span>
              </div>
              <p className="text-gray-300 text-sm">
                Helping marketers confidently use AI with practical, daily workflows.
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/workflows" className="text-gray-300 hover:text-white transition-colors">
                    Workflows
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="text-gray-300 hover:text-white transition-colors">
                    Tools
                  </Link>
                </li>
                <li>
                  <Link href="/trends" className="text-gray-300 hover:text-white transition-colors">
                    Trends
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-gray-300 hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-300 hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Daily AI Workflow. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
