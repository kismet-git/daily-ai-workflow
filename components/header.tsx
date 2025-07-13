"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/dailyaiworkflow-icon.png" alt="Daily AI Workflow" width={36} height={36} className="h-9 w-9" />
            <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-900">
              Daily AI Workflow
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-10">
            <Link href="/workflows" className="text-gray-600 hover:text-gray-900 transition-colors">
              Workflows
            </Link>
            <Link href="/trends" className="text-gray-600 hover:text-gray-900 transition-colors">
              Trends
            </Link>
            <Link href="/tools" className="text-gray-600 hover:text-gray-900 transition-colors">
              Tools
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
          </nav>

          <Button variant="outline" size="lg" asChild className="font-medium bg-transparent">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
