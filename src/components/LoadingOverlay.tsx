'use client'

import React from 'react'

interface LoadingOverlayProps {
  isLoading: boolean
  message?: string
}

export default function LoadingOverlay({ isLoading, message = 'Loading...' }: LoadingOverlayProps) {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl flex items-center gap-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        <span className="text-gray-900 font-medium">{message}</span>
      </div>
    </div>
  )
} 