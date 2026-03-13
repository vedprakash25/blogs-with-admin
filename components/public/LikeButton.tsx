'use client'

import { useState, useEffect } from 'react'
import { getFingerprint } from '@/lib/utils/fingerprint'

interface LikeButtonProps {
  blogId: string
  initialLikes: number
}

export default function LikeButton({ blogId, initialLikes }: LikeButtonProps) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(initialLikes)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function checkLiked() {
      const fp = await getFingerprint()
      const res = await fetch(`/api/likes?blog_id=${blogId}&fingerprint=${fp}`)
      const { data } = await res.json()
      setLiked(data?.liked ?? false)
    }
    checkLiked()
  }, [blogId])

  async function handleToggle() {
    if (loading) return
    setLoading(true)

    // Optimistic update
    setLiked((prev) => !prev)
    setLikes((prev) => liked ? prev - 1 : prev + 1)

    const fp = await getFingerprint()
    const res = await fetch('/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blog_id: blogId, fingerprint: fp }),
    })
    const { data, error } = await res.json()

    if (error) {
      // Revert on error
      setLiked((prev) => !prev)
      setLikes(initialLikes)
    } else {
      setLiked(data.liked)
      setLikes(data.likes)
    }

    setLoading(false)
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
        liked
          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-500'
          : 'border-border text-muted-foreground hover:border-orange-400 hover:text-orange-500'
      }`}
    >
      <span className="text-lg">{liked ? '♥' : '♡'}</span>
      <span className="text-sm font-medium">{likes}</span>
    </button>
  )
}
