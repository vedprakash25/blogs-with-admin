import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-end justify-between gap-4">
        <div>
          <Link href="/" className="text-4xl font-zen tracking-tight shrink-0">
            Lense<span className="text-orange-500"></span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">
            Thoughts, stories and ideas.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Lense. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
