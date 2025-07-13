import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

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
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
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
        {/* Favicon and Icons */}
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

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />

        {/* Structured Data */}
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

        {/* Analytics Placeholders - Replace with actual tracking IDs */}
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />

        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />

        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {children}
      </body>
    </html>
  )
}
