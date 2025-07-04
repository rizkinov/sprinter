'use client'

import React from 'react'
import { Edit, Trash2, Clock } from 'lucide-react'
import { getCategoryIcon } from '../lib/utils'
import { useTaskActualHours } from '../hooks/useTimeTracking'
import { formatHours } from '../lib/timeTracking'

import type { Task } from '../types'

interface TaskCardProps {
  task: Task
  draggedTask?: any
  onEditTask: (task: any) => void
  onDeleteTask: (task: any) => void
  onDragStart: (e: React.DragEvent, task: any) => void
  onDragEnd: () => void
  isSelected?: boolean
  onToggleSelect?: (task: any) => void
  showSelection?: boolean
}

const StatusBadge = ({ status, className = '' }: { status: string; className?: string }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'high':
        return 'bg-gray-900 text-white'
      case 'medium':
        return 'bg-gray-600 text-white'
      case 'low':
        return 'bg-gray-400 text-white'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusStyles(status)} ${className}`}>
      {status}
    </span>
  )
}

const TaskCard = React.memo(function TaskCard({ 
  task, 
  draggedTask, 
  onEditTask, 
  onDeleteTask,
  onDragStart, 
  onDragEnd,
  isSelected = false,
  onToggleSelect,
  showSelection = false
}: TaskCardProps) {
  // Use dynamic time tracking for actual hours
  const actualHours = useTaskActualHours(task)
  
  return (
    <div 
      key={task.id} 
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      className={`bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all cursor-move focus:ring-2 focus:ring-blue-500 focus:outline-none ${
        draggedTask?.id === task.id ? 'opacity-50 rotate-2' : ''
      } ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
      onClick={(e) => {
        if (showSelection && e.target instanceof HTMLInputElement) {
          // Let checkbox handle its own click
          return
        }
        if (showSelection && onToggleSelect) {
          onToggleSelect(task)
        } else {
          onEditTask(task)
        }
      }}
      role="article"
      aria-label={`Task: ${task.title}, Status: ${task.status}, Priority: ${task.priority}, Category: ${task.category}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (showSelection && onToggleSelect) {
            onToggleSelect(task)
          } else {
            onEditTask(task)
          }
        }
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {showSelection && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation()
                onToggleSelect?.(task)
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              aria-label={`Select task: ${task.title}`}
            />
          )}
          {(() => {
            const CategoryIcon = getCategoryIcon(task.category)
            return <CategoryIcon size={14} className="text-gray-500" />
          })()}
        </div>
        <div className="flex items-center gap-1">
          {/* Show active time tracking indicator for in-progress tasks */}
          {task.status === 'In Progress' && task.in_progress_started_at && (
            <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
              <Clock size={10} />
              <span>Active</span>
            </div>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onEditTask(task)
            }}
            className="p-1 hover:bg-gray-100 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label={`Edit task: ${task.title}`}
          >
            <Edit size={12} className="text-gray-400" aria-hidden="true" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onDeleteTask(task)
            }}
            className="p-1 hover:bg-gray-100 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
            aria-label={`Delete task: ${task.title}`}
          >
            <Trash2 size={12} className="text-gray-400 hover:text-red-500" aria-hidden="true" />
          </button>
        </div>
      </div>
      <h4 className="font-medium text-sm mb-3 text-gray-900 leading-tight">{task.title}</h4>
      <div className="flex items-center justify-between mb-3">
        <StatusBadge status={task.priority.toLowerCase()} />
        <span className="text-xs text-gray-500">{actualHours || 0}h / {task.estimatedHours || task.estimated_hours || 0}h</span>
      </div>
      {task.due_date && (
        <div className="mb-3">
          <span className="text-xs text-gray-500">Due: {new Date(task.due_date).toLocaleDateString()}</span>
        </div>
      )}
      <div className="flex gap-1 flex-wrap">
        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium border border-gray-300">
          {task.category}
        </span>
      </div>
    </div>
  )
})

export default TaskCard