// Time tracking utilities for dynamic actual hours calculation

export interface TimeTrackingData {
  inProgressStartedAt?: string | null
  inProgressTotalSeconds: number
  lastStatusChangeAt: string
  status: string
}

/**
 * Calculate total hours spent on a task including current session
 */
export function calculateActualHours(timeData: TimeTrackingData): number {
  const { inProgressStartedAt, inProgressTotalSeconds, status } = timeData
  
  let totalSeconds = inProgressTotalSeconds || 0
  
  // If currently in progress, add time from current session
  if (status === 'In Progress' && inProgressStartedAt) {
    const startTime = new Date(inProgressStartedAt).getTime()
    const currentTime = new Date().getTime()
    const currentSessionSeconds = Math.floor((currentTime - startTime) / 1000)
    totalSeconds += currentSessionSeconds
  }
  
  // Convert seconds to hours (decimal format)
  return Math.round((totalSeconds / 3600) * 10) / 10 // Round to 1 decimal place
}

/**
 * Format hours for display (e.g., "2.5 hours")
 */
export function formatHours(hours: number): string {
  if (hours === 0) return '0 hours'
  if (hours === 1) return '1 hour'
  return `${hours} hours`
}

/**
 * Calculate time tracking updates when task status changes
 */
export function calculateStatusChangeUpdates(
  oldStatus: string,
  newStatus: string,
  currentTimeData: TimeTrackingData
): Partial<TimeTrackingData> {
  const now = new Date().toISOString()
  const updates: Partial<TimeTrackingData> = {
    lastStatusChangeAt: now
  }

  // If leaving "In Progress" status, accumulate the time
  if (oldStatus === 'In Progress' && newStatus !== 'In Progress') {
    if (currentTimeData.inProgressStartedAt) {
      const startTime = new Date(currentTimeData.inProgressStartedAt).getTime()
      const endTime = new Date().getTime()
      const sessionSeconds = Math.floor((endTime - startTime) / 1000)
      
      updates.inProgressTotalSeconds = (currentTimeData.inProgressTotalSeconds || 0) + sessionSeconds
      updates.inProgressStartedAt = null
    }
  }
  
  // If entering "In Progress" status, start new session
  if (oldStatus !== 'In Progress' && newStatus === 'In Progress') {
    updates.inProgressStartedAt = now
  }

  return updates
}

/**
 * Initialize time tracking data for new tasks
 */
export function initializeTimeTracking(status: string): Partial<TimeTrackingData> {
  const now = new Date().toISOString()
  
  return {
    inProgressTotalSeconds: 0,
    lastStatusChangeAt: now,
    inProgressStartedAt: status === 'In Progress' ? now : null
  }
} 