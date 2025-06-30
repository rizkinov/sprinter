'use client'

import React from 'react'
import { AlertTriangle, X } from 'lucide-react'
import LoadingButton from './LoadingButton'

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  isLoading?: boolean
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false
}: ConfirmationDialogProps) {
  if (!isOpen) return null

  const variantStyles = {
    danger: {
      icon: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    },
    warning: {
      icon: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      confirmButton: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
    },
    info: {
      icon: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
    }
  }

  const styles = variantStyles[variant]

  return (
    <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${styles.bg} ${styles.border} border`}>
              <AlertTriangle size={20} className={styles.icon} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          >
            {cancelText}
          </button>
          <LoadingButton
            onClick={onConfirm}
            loading={isLoading}
            size="md"
            className={`text-white ${styles.confirmButton}`}
          >
            {confirmText}
          </LoadingButton>
        </div>
      </div>
    </div>
  )
} 