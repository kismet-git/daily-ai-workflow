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
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/dailyaiworkflow-icon.png" alt="Daily AI Workflow" width={32} height={32} className="h-8 w-8" />
            <Link href="/" className="text-xl font-bold text-gray-900">
              Daily AI Workflow
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
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

          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
