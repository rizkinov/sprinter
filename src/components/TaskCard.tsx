'use client'

import React from 'react'
import { Edit, Trash2, Code } from 'lucide-react'

interface TaskCardProps {
  task: {
    id: string
    title: string
    description?: string
    category: string
    priority: string
    status: string
    estimatedHours: number
    actualHours: number
  }
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
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyles(status)} ${className}`}>
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
          <Code size={14} className="text-gray-500" />
        </div>
        <div className="flex items-center gap-1">
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
        <span className="text-xs text-gray-500">{task.actualHours}h / {task.estimatedHours}h</span>
      </div>
      <div className="flex gap-1 flex-wrap">
        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium border border-gray-300">
          {task.category}
        </span>
      </div>
    </div>
  )
})

export default TaskCard