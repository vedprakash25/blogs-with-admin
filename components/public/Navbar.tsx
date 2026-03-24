'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { ClosedCaption, EyeClosed, LensConvex, Moon, Search, SearchSlash, SearchX, Sun, X } from 'lucide-react'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [popup, setPopup] = useState(false)

  useEffect(() => setMounted(true), [])

  const toggleSearch = () => {
    popup ? setPopup(false) : setPopup(true)
  }

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-zen tracking-tight shrink-0">
          TheLense<span className="text-orange-500"></span>
        </Link>


        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleSearch}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Search blogs"
          >
            <Search className="w-4 h-4" />
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      {
        popup && <div className="flex-1 fixed inset-0 h-screen w-full max-w-screen pb-[25%] flex justify-center items-center bg-black/90 backdrop-blur-[100px] ">
          <div className='max-w-xl w-full'>
            <SearchBar />
          </div>

          <button className='absolute bottom-10 inset-x-auto text-2xl text-white cursor-pointer hover:fill-white 
          h-10 w-10 border group hover:bg-white transition-all duration-500 flex justify-center items-center rounded-full' onClick={toggleSearch}>
            <X className='group-hover:text-black transition-all duration-500' />
          </button>

        </div>
      }

    </header>
  )
}
