// Utility functions for the solo founder dashboard

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const calculateDaysUntilLaunch = (launchDate: string): number => {
  const today = new Date()
  const launch = new Date(launchDate)
  const diffTime = launch.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
} 