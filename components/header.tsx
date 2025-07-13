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
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src="https://c4zimgtqfyusams5.public.blob.vercel-storage.com/dailyaiworkflow-sq.png"
                alt="Daily AI Workflow Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg shadow-sm"
                priority
              />
              <div
                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"
                aria-hidden="true"
              />
            </div>
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              aria-label="Daily AI Workflow - Home"
            >
              Daily AI Workflow
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <Link
              href="/workflows"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium relative group"
              aria-label="Browse AI Marketing Workflows"
            >
              Workflows
              <span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/trends"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium relative group"
              aria-label="AI Marketing Trends"
            >
              Trends
              <span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/tools"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium relative group"
              aria-label="AI Marketing Tools"
            >
              Tools
              <span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium relative group"
              aria-label="Pricing Plans"
            >
              Pricing
              <span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"
                aria-hidden="true"
              />
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
              <Link href="/login" aria-label="Login to your account">
                Login
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl"
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/workflows"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Browse AI Marketing Workflows"
              >
                Workflows
              </Link>
              <Link
                href="/trends"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="AI Marketing Trends"
              >
                Trends
              </Link>
              <Link
                href="/tools"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="AI Marketing Tools"
              >
                Tools
              </Link>
              <Link
                href="/pricing"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Pricing Plans"
              >
                Pricing
              </Link>
              <div className="pt-2">
                <Button asChild className="w-full">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} aria-label="Login to your account">
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
