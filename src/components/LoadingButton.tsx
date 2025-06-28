'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface LoadingButtonProps {
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  icon?: LucideIcon
  iconSize?: number
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function LoadingButton({
  onClick,
  disabled = false,
  loading = false,
  children,
  icon: Icon,
  iconSize = 16,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button'
}: LoadingButtonProps) {
  const baseClasses = 'font-medium flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white focus:ring-gray-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-900 border border-gray-300 focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-gray-100 disabled:bg-transparent text-gray-700 disabled:text-gray-400 focus:ring-gray-500'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg'
  }
  
  const spinnerSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }
  
  const isDisabled = disabled || loading
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <div className={`animate-spin rounded-full border border-current border-t-transparent ${spinnerSizes[size]}`}></div>
      ) : (
        Icon && <Icon size={iconSize} />
      )}
      {children}
    </button>
  )
} 