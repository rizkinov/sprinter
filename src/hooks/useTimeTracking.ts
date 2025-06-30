// React hook for real-time time tracking
import { useState, useEffect, useCallback } from 'react'
import { calculateActualHours } from '../lib/timeTracking'
import type { Task } from '../types'

export interface TimeTrackingTask extends Task {
  calculatedActualHours?: number
}

/**
 * Hook to manage real-time time tracking for tasks
 */
export function useTimeTracking(tasks: Task[]): TimeTrackingTask[] {
  const [trackedTasks, setTrackedTasks] = useState<TimeTrackingTask[]>([])

  // Calculate actual hours for all tasks
  const calculateTasksWithActualHours = useCallback((taskList: Task[]): TimeTrackingTask[] => {
    return taskList.map(task => {
      // For new tasks with time tracking data, calculate dynamic hours
      if (task.in_progress_total_seconds !== undefined && task.last_status_change_at) {
        const calculatedHours = calculateActualHours({
          inProgressStartedAt: task.in_progress_started_at,
          inProgressTotalSeconds: task.in_progress_total_seconds,
          lastStatusChangeAt: task.last_status_change_at,
          status: task.status
        })
        
        return {
          ...task,
          calculatedActualHours: calculatedHours
        }
      }
      
      // For legacy tasks, use the static actual_hours value
      return {
        ...task,
        calculatedActualHours: task.actual_hours
      }
    })
  }, [])

  // Update tracked tasks when tasks change
  useEffect(() => {
    const tasksWithHours = calculateTasksWithActualHours(tasks)
    setTrackedTasks(tasksWithHours)
  }, [tasks, calculateTasksWithActualHours])

  // Set up real-time updates for in-progress tasks
  useEffect(() => {
    const inProgressTasks = tasks.filter(task => 
      task.status === 'In Progress' && 
      task.in_progress_started_at &&
      task.in_progress_total_seconds !== undefined
    )

    if (inProgressTasks.length === 0) {
      return
    }

    // Update every minute for in-progress tasks
    const interval = setInterval(() => {
      setTrackedTasks(prevTasks => 
        prevTasks.map(task => {
          // Only recalculate for in-progress tasks with time tracking
          if (task.status === 'In Progress' && 
              task.in_progress_started_at && 
              task.in_progress_total_seconds !== undefined) {
            
            const calculatedHours = calculateActualHours({
              inProgressStartedAt: task.in_progress_started_at,
              inProgressTotalSeconds: task.in_progress_total_seconds,
              lastStatusChangeAt: task.last_status_change_at,
              status: task.status
            })
            
            return {
              ...task,
              calculatedActualHours: calculatedHours
            }
          }
          
          return task
        })
      )
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [tasks])

  return trackedTasks
}

/**
 * Hook to get the display hours for a task (either calculated or actual)
 */
export function useTaskActualHours(task: Task): number {
  const [displayHours, setDisplayHours] = useState<number>(task.actual_hours || 0)

  useEffect(() => {
    // For new tasks with time tracking, calculate dynamic hours
    if (task.in_progress_total_seconds !== undefined && task.last_status_change_at) {
      const calculatedHours = calculateActualHours({
        inProgressStartedAt: task.in_progress_started_at,
        inProgressTotalSeconds: task.in_progress_total_seconds,
        lastStatusChangeAt: task.last_status_change_at,
        status: task.status
      })
      setDisplayHours(calculatedHours)
      
      // If task is in progress, update every minute
      if (task.status === 'In Progress' && task.in_progress_started_at) {
        const interval = setInterval(() => {
          const updatedHours = calculateActualHours({
            inProgressStartedAt: task.in_progress_started_at,
            inProgressTotalSeconds: task.in_progress_total_seconds,
            lastStatusChangeAt: task.last_status_change_at,
            status: task.status
          })
          setDisplayHours(updatedHours)
        }, 60000)
        
        return () => clearInterval(interval)
      }
    } else {
      // For legacy tasks, use static actual_hours (with fallback to 0)
      setDisplayHours(task.actual_hours || 0)
    }
  }, [task])

  return displayHours
} 