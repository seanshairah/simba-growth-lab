import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Simbarashe Able Mukondo — Marketing Strategist & Digital Marketing Analyst",
  description:
    "Marketing Analyst & Strategist turning complex digital data into profitable growth roadmaps. Fractional analytics, funnel conversion audits and social media performance audits for scaling brands.",
  keywords: [
    "marketing analyst",
    "digital marketing",
    "marketing strategist",
    "social media audit",
    "conversion audit",
    "Zimbabwe",
    "Simba Growth Lab",
  ],
  openGraph: {
    title: "Simbarashe Able Mukondo — Marketing Strategist & Analyst",
    description:
      "Turning complex digital data into profitable growth roadmaps.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
