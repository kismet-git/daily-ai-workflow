import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import ErrorBoundary from "@/components/error-boundary"
import { validateEnvironment } from "@/lib/security"

const inter = Inter({ subsets: ["latin"] })

// Validate environment variables on startup
if (process.env.NODE_ENV === "production") {
  validateEnvironment()
}

export const metadata: Metadata = {
  title: "Daily AI Workflow - Discover AI-Powered Productivity",
  description:
    "Discover curated AI workflows to boost your productivity. From automation to content creation, find the perfect AI tools and processes for your daily tasks.",
  keywords: "AI workflows, productivity, automation, artificial intelligence, daily tasks, AI tools",
  authors: [{ name: "Daily AI Workflow Team" }],
  creator: "Daily AI Workflow",
  publisher: "Daily AI Workflow",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dailyaiworkflow.com",
    title: "Daily AI Workflow - Discover AI-Powered Productivity",
    description:
      "Discover curated AI workflows to boost your productivity. From automation to content creation, find the perfect AI tools and processes for your daily tasks.",
    siteName: "Daily AI Workflow",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily AI Workflow - Discover AI-Powered Productivity",
    description:
      "Discover curated AI workflows to boost your productivity. From automation to content creation, find the perfect AI tools and processes for your daily tasks.",
    creator: "@dailyaiworkflow",
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4HW4FS672X"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4HW4FS672X');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
