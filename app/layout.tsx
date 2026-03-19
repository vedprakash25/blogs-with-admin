import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter, Zen_Dots, Sora } from "next/font/google"

import './globals.css'



const zen = Zen_Dots({ weight: ["400"], subsets: ['latin'], variable: '--font-zen' });

const inter = Inter({
  weight: ["400"],
  subsets: ['latin'],
  variable: '--font-inter'
})
const sora = Sora({
  weight: ["400"],
  subsets: ['latin'],
  variable: '--font-sora'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${zen.variable} ${sora.variable} ${inter.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
