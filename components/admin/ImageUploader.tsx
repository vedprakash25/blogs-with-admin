'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

interface ImageUploaderProps {
  value: string | null
  onChange: (url: string | null) => void
  label?: string
}

export default function ImageUploader({ value, onChange, label = 'Cover image' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const { data, error } = await res.json()

    setUploading(false)

    if (error) {
      setError(error)
      return
    }

    onChange(data.url)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-border group">
          <img src={value} alt="Cover" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 bg-white text-black text-sm rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg font-medium hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50/30 dark:hover:bg-orange-950/10 transition-colors"
        >
          {uploading ? (
            <div className="text-muted-foreground text-sm">Uploading...</div>
          ) : (
            <>
              <div className="text-3xl mb-2">🖼</div>
              <p className="text-sm text-muted-foreground">Click or drag to upload</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 5MB</p>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
        className="hidden"
      />
    </div>
  )
}
