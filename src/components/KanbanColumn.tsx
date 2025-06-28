'use client'

import React from 'react'
import TaskCard from './TaskCard'

interface KanbanColumnProps {
  title: string
  status: string
  tasks: any[]
  count: number
  draggedTask?: any
  onEditTask: (task: any) => void
  onDeleteTask: (task: any) => void
  onDragStart: (e: React.DragEvent, task: any) => void
  onDragEnd: () => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, newStatus: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked') => void
  bgColor?: string
  borderColor?: string
  dotColor?: string
  badgeColor?: string
  selectedTasks?: string[]
  onToggleSelect?: (task: any) => void
  showSelection?: boolean
}

const KanbanColumn = React.memo(function KanbanColumn({
  title,
  status,
  tasks,
  count,
  draggedTask,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  bgColor = 'bg-gray-50',
  borderColor = 'border',
  dotColor = 'bg-gray-400',
  badgeColor = 'bg-gray-200 text-gray-700',
  selectedTasks = [],
  onToggleSelect,
  showSelection = false
}: KanbanColumnProps) {
  const filteredTasks = tasks.filter(task => task.status === status)

  return (
    <div 
      className={`${bgColor} rounded-lg p-4 ${borderColor} min-h-[400px]`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status as 'Not Started' | 'In Progress' | 'Completed' | 'Blocked')}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
          {title}
        </h3>
        <span className={`${badgeColor} text-xs px-2 py-1 rounded-full font-medium`}>
          {count}
        </span>
      </div>
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No {title.toLowerCase()} tasks</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              draggedTask={draggedTask}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              isSelected={selectedTasks.includes(task.id)}
              onToggleSelect={onToggleSelect}
              showSelection={showSelection}
            />
          ))
        )}
      </div>
    </div>
  )
})

export default KanbanColumn 