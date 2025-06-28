'use client'

import React from 'react'
import { Trash2, Edit, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react'
import LoadingButton from './LoadingButton'

interface BulkActionsBarProps {
  selectedCount: number
  onDeselectAll: () => void
  onBulkDelete: () => void
  onBulkStatusChange: (status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked') => void
  onBulkPriorityChange: (priority: 'High' | 'Medium' | 'Low') => void
  isLoading?: boolean
}

export default function BulkActionsBar({
  selectedCount,
  onDeselectAll,
  onBulkDelete,
  onBulkStatusChange,
  onBulkPriorityChange,
  isLoading = false
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-96">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-900">
            {selectedCount} task{selectedCount > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={onDeselectAll}
            className="text-sm text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            Deselect all
          </button>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Actions */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500 mr-1">Status:</span>
            <button
              onClick={() => onBulkStatusChange('Not Started')}
              disabled={isLoading}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded text-gray-700 disabled:opacity-50"
              title="Mark as Not Started"
            >
              <Clock size={12} />
              Not Started
            </button>
            <button
              onClick={() => onBulkStatusChange('In Progress')}
              disabled={isLoading}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded text-blue-700 disabled:opacity-50"
              title="Mark as In Progress"
            >
              <Edit size={12} />
              In Progress
            </button>
            <button
              onClick={() => onBulkStatusChange('Completed')}
              disabled={isLoading}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 hover:bg-green-200 rounded text-green-700 disabled:opacity-50"
              title="Mark as Completed"
            >
              <CheckCircle size={12} />
              Completed
            </button>
            <button
              onClick={() => onBulkStatusChange('Blocked')}
              disabled={isLoading}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 hover:bg-red-200 rounded text-red-700 disabled:opacity-50"
              title="Mark as Blocked"
            >
              <XCircle size={12} />
              Blocked
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Priority Actions */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500 mr-1">Priority:</span>
            <button
              onClick={() => onBulkPriorityChange('High')}
              disabled={isLoading}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 hover:bg-red-200 rounded text-red-700 disabled:opacity-50"
              title="Set High Priority"
            >
              <AlertTriangle size={12} />
              High
            </button>
            <button
              onClick={() => onBulkPriorityChange('Medium')}
              disabled={isLoading}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 rounded text-yellow-700 disabled:opacity-50"
              title="Set Medium Priority"
            >
              <AlertTriangle size={12} />
              Medium
            </button>
            <button
              onClick={() => onBulkPriorityChange('Low')}
              disabled={isLoading}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded text-gray-700 disabled:opacity-50"
              title="Set Low Priority"
            >
              <AlertTriangle size={12} />
              Low
            </button>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Delete Action */}
          <LoadingButton
            onClick={onBulkDelete}
            loading={isLoading}
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
          >
            <Trash2 size={12} />
            Delete
          </LoadingButton>
        </div>
      </div>
    </div>
  )
}