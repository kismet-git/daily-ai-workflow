"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-gray-900/5 border-b border-gray-200/50"
          : "bg-white/80 backdrop-blur-sm border-b border-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src="/dailyaiworkflow-icon.png"
                alt="Daily AI Workflow"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg shadow-sm"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
            </div>
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Daily AI Workflow
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/workflows"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium relative group"
            >
              Workflows
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/trends"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium relative group"
            >
              Trends
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/tools"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium relative group"
            >
              Tools
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full" />
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="hidden sm:inline-flex font-medium bg-white/50 backdrop-blur-sm border-gray-300 hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
            >
              <Link href="/login">Login</Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/workflows"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Workflows
              </Link>
              <Link
                href="/trends"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trends
              </Link>
              <Link
                href="/tools"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tools
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="pt-2">
                <Button asChild className="w-full">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
