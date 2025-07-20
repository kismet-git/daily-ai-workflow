import type React from "react"
import type { Metadata } from "next"
import { ErrorBoundary } from "@/components/error-boundary"
import { validateEnvironment } from "@/lib/security"
import "./globals.css"

if (process.env.NODE_ENV === "production") {
  try {
    validateEnvironment()
  } catch (error) {
    console.error("Environment validation failed:", error)
  }
}

export const metadata: Metadata = {
  title: "Daily AI Workflow – One AI-powered marketing workflow, delivered daily",
  description:
    "Discover a new AI-powered marketing workflow every day. Built for marketers who want clear, actionable strategies powered by AI.",
  keywords:
    "AI marketing, marketing workflows, AI automation, marketing strategies, artificial intelligence, digital marketing, marketing tools",
  authors: [{ name: "Daily AI Workflow" }],
  creator: "Daily AI Workflow",
  publisher: "Daily AI Workflow",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.dailyaiworkflow.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.dailyaiworkflow.com",
    title: "Daily AI Workflow – One AI-powered marketing workflow, delivered daily",
    description:
      "Discover a new AI-powered marketing workflow every day. Built for marketers who want clear, actionable strategies powered by AI.",
    siteName: "Daily AI Workflow",
    images: [
      {
        url: "https://c4zimgtqfyusams5.public.blob.vercel-storage.com/dailyaiworkflow-sq.png",
        width: 1200,
        height: 630,
        alt: "Daily AI Workflow - AI Marketing Workflows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily AI Workflow – One AI-powered marketing workflow, delivered daily",
    description:
      "Discover a new AI-powered marketing workflow every day. Built for marketers who want clear, actionable strategies powered by AI.",
    images: ["https://c4zimgtqfyusams5.public.blob.vercel-storage.com/dailyaiworkflow-sq.png"],
    creator: "@dailyaiworkflow",
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
  category: "technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://c4zimgtqfyusams5.public.blob.vercel-storage.com/dailyaiworkflow-sq.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://c4zimgtqfyusams5.public.blob.vercel-storage.com/dailyaiworkflow-sq.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://c4zimgtqfyusams5.public.blob.vercel-storage.com/dailyaiworkflow-sq.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Daily AI Workflow",
              description:
                "Discover a new AI-powered marketing workflow every day. Built for marketers who want clear, actionable strategies powered by AI.",
              url: "https://www.dailyaiworkflow.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.dailyaiworkflow.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "Daily AI Workflow",
                url: "https://www.dailyaiworkflow.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://c4zimgtqfyusams5.public.blob.vercel-storage.com/dailyaiworkflow-sq.png",
                },
              },
            }),
          }}
        />
      </head>
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
