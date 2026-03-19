import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { Banner } from './banner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL("https://thelense.vercel.app"), // 🔁 replace with your actual domain

  title: {
    default: "The Lense | See past the surface.",
    template: "%s | The Lense",
  },
  description:
    "The Lense is a blogging platform for curious minds. Discover stories, ideas, and perspectives from writers around the world.",
  keywords: [
    "blog",
    "stories",
    "articles",
    "writers",
    "the lense",
    "reading",
    "opinions",
    "ideas",
  ],
  authors: [{ name: "The Lense" }],
  creator: "The Lense",
  publisher: "The Lense",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thelense.vercel.app", // 🔁 replace with your actual domain
    siteName: "The Lense",
    title: "The Lense | See past the surface.",
    description:
      "Discover stories, ideas, and perspectives from writers around the world. The Lense is where great writing lives.",
    images: [
      {
        url: "/og-image-optimized.webp", // 🔁 add a 1200×630px image to /public
        width: 1200,
        height: 630,
        alt: "The Lense | See past the surface.",
      },
    ],
  },

  // ── Twitter Card ───────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@thelense", // 🔁 replace with your Twitter handle
    creator: "@thelense", // 🔁 replace with your Twitter handle
    title: "The Lense | See past the surface.",
    description:
      "Discover stories, ideas, and perspectives from writers around the world. The Lense is where great writing lives.",
    images: ["/og-image.png"], // 🔁 same image as OG
  },

  // ── Extras ─────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://thelense.vercel.app", // 🔁 replace with your actual domain
  },
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}</main>
      <Footer />
    </div>
  )
}
