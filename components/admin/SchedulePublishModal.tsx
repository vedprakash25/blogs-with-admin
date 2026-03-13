'use client'

import { useState } from 'react'

interface SchedulePublishModalProps {
  onConfirm: (date: Date) => void
  onCancel: () => void
}

export default function SchedulePublishModal({ onConfirm, onCancel }: SchedulePublishModalProps) {
  const minDate = new Date()
  minDate.setMinutes(minDate.getMinutes() + 5)
  const minStr = minDate.toISOString().slice(0, 16)

  const [value, setValue] = useState(minStr)
  const [error, setError] = useState<string | null>(null)

  function handleConfirm() {
    const selected = new Date(value)
    if (selected <= new Date()) {
      setError('Please choose a future date and time')
      return
    }
    onConfirm(selected)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-lg font-semibold mb-1">Schedule publish</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Choose when this blog should go live automatically.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1.5">Publish date & time</label>
          <input
            type="datetime-local"
            value={value}
            min={minStr}
            onChange={(e) => { setValue(e.target.value); setError(null) }}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  )
}
