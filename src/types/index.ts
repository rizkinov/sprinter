// Core data types for the Sprinter application

export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  name: string
  description?: string | null  // Allow null from database
  start_date: string
  target_launch_date: string
  current_sprint: number
  total_sprints: number
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  project_id: string
  user_id: string
  title: string
  description?: string
  category: TaskCategory
  priority: TaskPriority
  status: TaskStatus
  estimated_hours: number
  actual_hours: number
  due_date: string
  sprint_week: number
  created_at: string
  updated_at: string
  completed_at?: string
  // Legacy fields for compatibility with existing code
  estimatedHours?: number
  actualHours?: number
  sprintWeek?: number
}

export interface Milestone {
  id: string
  project_id: string
  user_id: string
  title: string
  description?: string
  target_date: string
  status: MilestoneStatus
  progress: number
  created_at: string
  updated_at: string
  tasks?: Task[]
  // Legacy fields for compatibility with existing code
  targetDate?: string
}

// Enums for type safety
export type TaskCategory = 'Development' | 'Design' | 'Testing' | 'Research' | 'Planning' | 'Marketing' | 'Other'
export type TaskPriority = 'Low' | 'Medium' | 'High'
export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Blocked'
export type MilestoneStatus = 'Not Started' | 'In Progress' | 'Completed'

// Form data interfaces
export interface ProjectFormData {
  name: string
  description: string
  startDate: string
  targetLaunchDate: string
  totalSprints: number
  milestoneTitle?: string
  milestoneDescription?: string
  milestoneTargetDate?: string
}

export interface TaskFormData {
  title: string
  description: string
  category: TaskCategory
  priority: TaskPriority
  estimatedHours: number
  dueDate: string
  sprintWeek: number
}

export interface MilestoneFormData {
  title: string
  description: string
  targetDate: string
}

// Component prop interfaces
export interface DatePickerProps {
  value?: Date
  onChange: (date: Date | undefined) => void
  placeholder?: string
  name?: string
}

export interface TabButtonProps {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  active: boolean
  onClick: () => void
}

export interface StatusBadgeProps {
  status: string
  className?: string
}

export interface ProgressBarProps {
  value: number
  max: number
  className?: string
}

// Database operation interfaces
export interface CreateProjectData {
  user_id: string
  name: string
  description?: string
  start_date: string
  target_launch_date: string
  current_sprint: number
  total_sprints: number
}

export interface CreateTaskData {
  project_id: string
  user_id: string
  title: string
  description?: string
  category: TaskCategory
  priority: TaskPriority
  status: TaskStatus
  estimated_hours: number
  actual_hours: number
  due_date: string
  sprint_week: number
}

export interface CreateMilestoneData {
  project_id: string
  user_id: string
  title: string
  description?: string
  target_date: string
  status: MilestoneStatus
  progress: number
}

export interface UpdateTaskData {
  title?: string
  description?: string
  category?: TaskCategory
  priority?: TaskPriority
  status?: TaskStatus
  estimated_hours?: number
  actual_hours?: number
  due_date?: string
  sprint_week?: number
}

export interface UpdateMilestoneData {
  title?: string
  description?: string
  target_date?: string
  status?: MilestoneStatus
  progress?: number
}

export interface UpdateProjectData {
  name?: string
  description?: string
  start_date?: string
  target_launch_date?: string
  current_sprint?: number
  total_sprints?: number
}

// Analytics interfaces
export interface TaskAnalytics {
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  blockedTasks: number
  notStartedTasks: number
  totalEstimatedHours: number
  totalActualHours: number
  completedHours: number
  highPriorityTasks: number
  mediumPriorityTasks: number
  lowPriorityTasks: number
  completionRate: number
  timeProgress: number
} 