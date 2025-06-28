'use client'

import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

interface ErrorBannerProps {
  error: string | null
  onDismiss: () => void
}

export default function ErrorBanner({ error, onDismiss }: ErrorBannerProps) {
  if (!error) return null

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
      <div className="flex items-center gap-2">
        <AlertTriangle size={16} className="text-red-600" />
        <p className="text-red-800 text-sm font-medium">{error}</p>
        <button
          onClick={onDismiss}
          className="ml-auto text-red-600 hover:text-red-800 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
} 