'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { 
  BarChart3, 
  Kanban, 
  TrendingUp, 
  Calendar as CalendarIcon,
  Download,
  Upload,
  Plus,
  Target,
  AlertTriangle,
  Clock,
  CheckCircle,
  CheckSquare,
  Activity,
  Code,
  Edit,
  Trash2,
  X,
  Folder,
  Settings,
  LogOut,
  User,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { formatDate, calculateDaysUntilLaunch } from '../lib/dataManager'
import { signOut } from '@/lib/supabase'
import { db } from '@/lib/database'
import AuthForm from '@/components/AuthForm'
import { useAuth } from '@/hooks/useAuth'
import ErrorBanner from '@/components/ErrorBanner'
import LoadingOverlay from '@/components/LoadingOverlay'
import LoadingButton from '@/components/LoadingButton'
import KanbanColumn from '@/components/KanbanColumn'
import ConfirmationDialog from '@/components/ConfirmationDialog'
import SearchAndFilter from '@/components/SearchAndFilter'
import BulkActionsBar from '@/components/BulkActionsBar'
import { exportTasks, exportMilestones, exportProject, type ExportFormat } from '@/lib/exportUtils'
import { getCategoryIcon } from '@/lib/utils'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAddMilestoneModal, setShowAddMilestoneModal] = useState(false)
  const [showProjectSetup, setShowProjectSetup] = useState(false)
  const [showResetConfirmation, setShowResetConfirmation] = useState(false)
  const [editingTask, setEditingTask] = useState<any>(null)
  const [editingMilestone, setEditingMilestone] = useState<any>(null)
  const [showEditMilestoneModal, setShowEditMilestoneModal] = useState(false)
  const [editingProjectName, setEditingProjectName] = useState(false)
  const [draggedTask, setDraggedTask] = useState<any>(null)
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [isCreatingMilestone, setIsCreatingMilestone] = useState(false)
  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const [isDeletingTask, setIsDeletingTask] = useState(false)
  
  // Delete confirmation state
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<any>(null)
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  
  // Bulk selection state
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [showSelection, setShowSelection] = useState(false)
  const [isBulkOperating, setIsBulkOperating] = useState(false)
  const [showBulkDeleteConfirmation, setShowBulkDeleteConfirmation] = useState(false)
  
  const [projectData, setProjectData] = useState({
    projectName: '',
    startDate: '',
    targetLaunchDate: '',
    description: '',
    currentSprint: 1,
    totalSprints: 16
  })
  const [tasks, setTasks] = useState<any[]>([])
  const [milestones, setMilestones] = useState<any[]>([])
  const [currentProject, setCurrentProject] = useState<any>(null)
  const daysUntilLaunch = projectData.targetLaunchDate ? calculateDaysUntilLaunch(projectData.targetLaunchDate) : 0
  
  // Sidebar state management
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [projects, setProjects] = useState<any[]>([])
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)

  // Load sidebar state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sprinter_sidebar_collapsed')
    if (saved) {
      setSidebarCollapsed(JSON.parse(saved))
    }
  }, [])

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('sprinter_sidebar_collapsed', JSON.stringify(sidebarCollapsed))
  }, [sidebarCollapsed])

  // Project management functions
  const switchProject = (projectId: string) => {
    setActiveProjectId(projectId)
    const project = projects.find(p => p.id === projectId)
    if (project) {
      setCurrentProject(project)
      setProjectData({
        projectName: project.name,
        description: project.description || '',
        startDate: project.start_date,
        targetLaunchDate: project.target_launch_date,
        currentSprint: project.current_sprint,
        totalSprints: project.total_sprints
      })
      // Load project tasks and milestones
      loadProjectData(projectId)
    }
  }

  const loadProjectData = async (projectId: string) => {
    if (!user) return
    try {
      const [projectTasks, projectMilestones] = await Promise.all([
        db.getTasks(projectId, user.id),
        db.getMilestones(projectId, user.id)
      ])
      setTasks(projectTasks || [])
      setMilestones(projectMilestones || [])
    } catch (error) {
      console.error('Error loading project data:', error)
    }
  }

  // Sidebar Component
  const Sidebar = () => (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
      sidebarCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold text-gray-900">Sprinter</h1>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={16} className="text-gray-600" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          )}
        </div>
      </div>

      {/* Projects Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {!sidebarCollapsed && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Projects
            </h3>
          )}
          
          {/* Current Project */}
          {currentProject && (
            <div className="mb-4">
              <div className={`flex items-center gap-3 p-2 rounded-lg bg-gray-100 ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}>
                <Folder size={16} className="text-gray-600 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {currentProject.name}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Other Projects */}
          {projects.filter(p => p.id !== activeProjectId).map((project) => (
            <button
              key={project.id}
              onClick={() => switchProject(project.id)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors mb-1 ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <Folder size={16} className="text-gray-400 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="text-sm text-gray-700 truncate">{project.name}</span>
              )}
            </button>
          ))}

          {/* New Project Button */}
          <button
            onClick={handleCreateProject}
            className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-500 ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <Plus size={16} className="flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="text-sm">New Project</span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <button
          className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors mb-2 ${
            sidebarCollapsed ? 'justify-center' : ''
          }`}
        >
          <Settings size={16} className="text-gray-500 flex-shrink-0" />
          {!sidebarCollapsed && (
            <span className="text-sm text-gray-700">Settings</span>
          )}
        </button>
        
        <button
          onClick={handleSignOut}
          className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors ${
            sidebarCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut size={16} className="text-gray-500 flex-shrink-0" />
          {!sidebarCollapsed && (
            <span className="text-sm text-gray-700">Sign Out</span>
          )}
        </button>
      </div>
    </div>
  )
  
  // Memoized expensive calculations
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = searchTerm === '' || 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
      const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory
    })
  }, [tasks, searchTerm, statusFilter, priorityFilter, categoryFilter])
  
  // Memoized categories for filter dropdown
  const availableCategories = useMemo(() => {
    return [...new Set(tasks.map(task => task.category))].sort()
  }, [tasks])
  
  // Memoized analytics calculations
  const taskAnalytics = useMemo(() => {
    const completed = tasks.filter(task => task.status === 'Completed').length
    const total = tasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0)
    const completedHours = tasks.filter(task => task.status === 'Completed').reduce((sum, task) => sum + (task.actualHours || 0), 0)
    
    return {
      completedTasks: completed,
      totalHours: total,
      completedHours
    }
  }, [tasks])
  
  const { completedTasks, totalHours, completedHours } = taskAnalytics
  
  // Safe calculation helpers
  const safePercentage = (numerator: number, denominator: number) => {
    if (!denominator || denominator === 0) return 0
    return Math.round((numerator / denominator) * 100)
  }
  
  const safeWidth = (numerator: number, denominator: number) => {
    if (!denominator || denominator === 0) return 0
    return Math.min(100, (numerator / denominator) * 100)
  }

  // Load user data when user changes
  useEffect(() => {
    if (user) {
      loadUserData(user.id)
    } else {
      // Reset to empty state when no user
      setTasks([])
      setProjectData({
        projectName: '',
        startDate: '',
        targetLaunchDate: '',
        description: '',
        currentSprint: 1,
        totalSprints: 16
      })
      setMilestones([])
      setCurrentProject(null)
    }
  }, [user])

    const loadUserData = async (userId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // Load all user's projects
      const userProjects = await db.getProjects(userId)
      setProjects(userProjects)
      
      if (userProjects.length > 0) {
        // Get the last active project or use the first one
        const savedActiveProjectId = localStorage.getItem('sprinter_active_project_id')
        const activeProject = userProjects.find(p => p.id === savedActiveProjectId) || userProjects[0]
        
        setCurrentProject(activeProject)
        setActiveProjectId(activeProject.id)
        setProjectData({
          projectName: activeProject.name,
          startDate: activeProject.start_date,
          targetLaunchDate: activeProject.target_launch_date,
          description: activeProject.description || '',
          currentSprint: activeProject.current_sprint,
          totalSprints: activeProject.total_sprints
        })

        // Load tasks and milestones for the active project
        const [userTasks, userMilestones] = await Promise.all([
          db.getTasks(activeProject.id, userId),
          db.getMilestones(activeProject.id, userId)
        ])

        setTasks(userTasks.map(task => ({
          id: task.id,
          title: task.title,
          description: task.description || '',
          category: task.category,
          priority: task.priority,
          status: task.status,
          estimatedHours: task.estimated_hours,
          actualHours: task.actual_hours,
          dueDate: task.due_date,
          createdAt: task.created_at,
          completedAt: task.completed_at || undefined,
          sprintWeek: task.sprint_week
        })))

        setMilestones(userMilestones.map(milestone => ({
          id: milestone.id,
          title: milestone.title,
          description: milestone.description || '',
          targetDate: milestone.target_date,
          status: milestone.status,
          progress: milestone.progress,
          createdAt: milestone.created_at,
          tasks: [] // We'll populate this later if needed
        })))
      } else {
        // No projects yet - user will create their first project
        setCurrentProject(null)
        setTasks([])
        setMilestones([])
        setProjectData({
          projectName: '',
          startDate: '',
          targetLaunchDate: '',
          description: '',
          currentSprint: 1,
          totalSprints: 16
        })
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      setError('Failed to load your data. Please try refreshing the page.')
    } finally {
      setIsLoading(false)
    }
  }

  // Save active project to localStorage
  useEffect(() => {
    if (activeProjectId) {
      localStorage.setItem('sprinter_active_project_id', activeProjectId)
    }
  }, [activeProjectId])

  // Recent Wins / Achievements system
  const [recentWins, setRecentWins] = useState<any[]>([])

  // Generate achievements based on current progress
  const generateRecentWins = useCallback(() => {
    const wins: any[] = []
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Recent task completions (last 7 days)
    const recentCompletedTasks = tasks.filter(task => {
      if (task.status !== 'Completed' || !task.completedAt) return false
      const completedDate = new Date(task.completedAt)
      return completedDate >= weekStart
    })

    // Today's completions
    const todayCompletions = recentCompletedTasks.filter(task => {
      const completedDate = new Date(task.completedAt!)
      return completedDate >= todayStart
    })

    // High priority task completions
    const highPriorityCompletions = recentCompletedTasks.filter(task => 
      task.priority === 'High'
    )

    // Category diversity achievements
    const categoriesCompleted = [...new Set(recentCompletedTasks.map(task => task.category))]

    // Milestone completions
    const completedMilestones = milestones.filter(milestone => milestone.status === 'Completed')

    // Add achievements
    if (todayCompletions.length > 0) {
      wins.push({
        id: `today-tasks-${todayCompletions.length}`,
        type: 'task_completion',
        title: `${todayCompletions.length} task${todayCompletions.length > 1 ? 's' : ''} completed today!`,
        description: todayCompletions.map(t => t.title).slice(0, 2).join(', ') + (todayCompletions.length > 2 ? '...' : ''),
        icon: 'CheckCircle',
        color: 'text-green-600',
        timestamp: now.toISOString()
      })
    }

    if (highPriorityCompletions.length > 0) {
      wins.push({
        id: `high-priority-${highPriorityCompletions.length}`,
        type: 'priority_achievement',
        title: `${highPriorityCompletions.length} high-priority task${highPriorityCompletions.length > 1 ? 's' : ''} crushed!`,
        description: `Completed: ${highPriorityCompletions.map(t => t.title).slice(0, 2).join(', ')}${highPriorityCompletions.length > 2 ? '...' : ''}`,
        icon: 'Target',
        color: 'text-orange-600',
        timestamp: now.toISOString()
      })
    }

    if (categoriesCompleted.length >= 3) {
      wins.push({
        id: `category-diversity-${categoriesCompleted.length}`,
        type: 'diversity_achievement',
        title: `Multi-tasking champion!`,
        description: `Completed tasks across ${categoriesCompleted.length} categories: ${categoriesCompleted.slice(0, 3).join(', ')}`,
        icon: 'Activity',
        color: 'text-purple-600',
        timestamp: now.toISOString()
      })
    }

    if (completedMilestones.length > 0) {
      wins.push({
        id: `milestone-${completedMilestones[0].id}`,
        type: 'milestone_achievement',
        title: `Milestone achieved!`,
        description: `Completed: ${completedMilestones[0].title}`,
        icon: 'CalendarIcon',
        color: 'text-blue-600',
        timestamp: now.toISOString()
      })
    }

    // Weekly streak achievement
    if (recentCompletedTasks.length >= 5) {
      wins.push({
        id: `weekly-streak-${recentCompletedTasks.length}`,
        type: 'streak_achievement',
        title: `Productivity streak!`,
        description: `${recentCompletedTasks.length} tasks completed this week`,
        icon: 'TrendingUp',
        color: 'text-indigo-600',
        timestamp: now.toISOString()
      })
    }

    // Total completion percentage milestone - calculate inline to avoid dependency issues
    const currentCompletedTasks = tasks.filter(task => task.status === 'Completed').length
    const completionRate = tasks.length === 0 ? 0 : Math.round((currentCompletedTasks / tasks.length) * 100)
    
    if (completionRate >= 50 && completionRate < 75 && tasks.length >= 5) {
      wins.push({
        id: `completion-50-milestone`,
        type: 'progress_milestone',
        title: `Halfway there!`,
        description: `${completionRate}% project completion - keep going!`,
        icon: 'BarChart3',
        color: 'text-yellow-600',
        timestamp: now.toISOString()
      })
    } else if (completionRate >= 75 && completionRate < 100 && tasks.length >= 5) {
      wins.push({
        id: `completion-75-milestone`,
        type: 'progress_milestone',
        title: `Almost there!`,
        description: `${completionRate}% complete - final sprint!`,
        icon: 'BarChart3',
        color: 'text-orange-600',
        timestamp: now.toISOString()
      })
    } else if (completionRate === 100 && tasks.length >= 5) {
      wins.push({
        id: `completion-100-milestone`,
        type: 'progress_milestone',
        title: `Project completed! 🎉`,
        description: `All tasks done - time to celebrate!`,
        icon: 'CheckSquare',
        color: 'text-green-600',
        timestamp: now.toISOString()
      })
    }

    // First task completion
    if (currentCompletedTasks === 1) {
      wins.push({
        id: `first-task-completion`,
        type: 'first_achievement',
        title: `First task completed!`,
        description: `Welcome to productivity - you're on your way!`,
        icon: 'CheckCircle',
        color: 'text-green-600',
        timestamp: now.toISOString()
      })
    }

    // Limit to 5 most recent wins
    return wins.slice(0, 5)
  }, [tasks, milestones])

  // Update recent wins when tasks/milestones change
  useEffect(() => {
    const wins = generateRecentWins()
    setRecentWins(wins)
  }, [generateRecentWins])

  // Smart Focus Area system
  const [focusArea, setFocusArea] = useState<any>({ priority: "", focusType: "general", metrics: [], urgentCount: 0 })

  // Template Import System (Phase 2B)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importedTemplate, setImportedTemplate] = useState<any>(null)
  const [showTemplatePreview, setShowTemplatePreview] = useState(false)
  const [importMode, setImportMode] = useState<'new-project' | 'replace-current'>('new-project')
  const [isImporting, setIsImporting] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)
  const generateFocusArea = useCallback(() => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    // Analyze current situation
    const overdueTasks = tasks.filter(task => 
      task.dueDate && new Date(task.dueDate) < today && task.status !== 'Completed'
    )
    const todayTasks = tasks.filter(task => 
      task.dueDate && new Date(task.dueDate).toDateString() === today.toDateString() && task.status !== 'Completed'
    )
    const tomorrowTasks = tasks.filter(task => 
      task.dueDate && new Date(task.dueDate).toDateString() === tomorrow.toDateString() && task.status !== 'Completed'
    )
    const blockedTasks = tasks.filter(task => task.status === 'Blocked')
    const highPriorityTasks = tasks.filter(task => 
      task.priority === 'High' && task.status !== 'Completed'
    )
    const inProgressTasks = tasks.filter(task => task.status === 'In Progress')
    
    // Find urgent milestones
    const urgentMilestones = milestones.filter(milestone => 
      milestone.status !== 'Completed' && 
      milestone.targetDate && 
      new Date(milestone.targetDate) <= nextWeek
    ).sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime())

    // Determine priority focus
    let priority = ""
    let focusType = "general"
    
         if (overdueTasks.length > 0) {
       priority = `${overdueTasks.length} overdue task${overdueTasks.length > 1 ? 's' : ''}: ${overdueTasks.slice(0, 2).map(t => t.title).join(', ')}${overdueTasks.length > 2 ? '...' : ''}`
       focusType = "urgent"
     } else if (blockedTasks.length > 0) {
       priority = `${blockedTasks.length} blocked task${blockedTasks.length > 1 ? 's' : ''} need attention: ${blockedTasks.slice(0, 2).map(t => t.title).join(', ')}${blockedTasks.length > 2 ? '...' : ''}`
       focusType = "blocked"
     } else if (todayTasks.length > 0) {
       priority = `${todayTasks.length} task${todayTasks.length > 1 ? 's' : ''} due today: ${todayTasks.slice(0, 2).map(t => t.title).join(', ')}${todayTasks.length > 2 ? '...' : ''}`
       focusType = "today"
     } else if (urgentMilestones.length > 0) {
       const milestone = urgentMilestones[0]
       const daysUntil = Math.ceil((new Date(milestone.targetDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
       priority = `Milestone "${milestone.title}" due in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`
       focusType = "milestone"
     } else if (highPriorityTasks.length > 0) {
       priority = `${highPriorityTasks.length} high-priority task${highPriorityTasks.length > 1 ? 's' : ''}: ${highPriorityTasks.slice(0, 2).map(t => t.title).join(', ')}${highPriorityTasks.length > 2 ? '...' : ''}`
       focusType = "high-priority"
     } else if (inProgressTasks.length > 0) {
       priority = `Continue working on: ${inProgressTasks.slice(0, 2).map(t => t.title).join(', ')}${inProgressTasks.length > 2 ? '...' : ''}`
       focusType = "in-progress"
     } else if (milestones.length > 0) {
       priority = `${milestones[0].title} - ${milestones[0].progress}% complete`
       focusType = "general"
     } else {
       priority = "Ready to start - add your first milestone or task!"
       focusType = "empty"
     }

    // Generate smart success metrics
    const metrics = []
    
         if (focusType === "urgent") {
       metrics.push(`Clear ${overdueTasks.length} overdue task${overdueTasks.length > 1 ? 's' : ''} immediately`)
       metrics.push(`Review task deadlines and priorities`)
       metrics.push(`Focus on completion over new tasks`)
     } else if (focusType === "blocked") {
       metrics.push(`Unblock ${blockedTasks.length} stalled task${blockedTasks.length > 1 ? 's' : ''}`)
       metrics.push(`Identify and resolve dependencies`)
       metrics.push(`Consider reassigning or breaking down tasks`)
     } else if (focusType === "today") {
       metrics.push(`Complete ${todayTasks.length} task${todayTasks.length > 1 ? 's' : ''} due today`)
       if (tomorrowTasks.length > 0) {
         metrics.push(`Prepare for ${tomorrowTasks.length} task${tomorrowTasks.length > 1 ? 's' : ''} due tomorrow`)
       }
       metrics.push(`Maintain daily momentum`)
     } else if (focusType === "milestone") {
       const milestone = urgentMilestones[0]
       const remaining = 100 - milestone.progress
       metrics.push(`Advance milestone progress by ${Math.min(remaining, 25)}%`)
       metrics.push(`Complete milestone-critical tasks first`)
       metrics.push(`Stay on track for deadline`)
     } else if (focusType === "high-priority") {
       metrics.push(`Complete ${Math.min(highPriorityTasks.length, 3)} high-priority task${Math.min(highPriorityTasks.length, 3) > 1 ? 's' : ''}`)
       metrics.push(`Focus on business-critical items`)
       metrics.push(`Minimize low-priority distractions`)
     } else if (focusType === "in-progress") {
       metrics.push(`Finish ${Math.min(inProgressTasks.length, 2)} in-progress task${Math.min(inProgressTasks.length, 2) > 1 ? 's' : ''}`)
       metrics.push(`Avoid starting new tasks until current ones are done`)
       metrics.push(`Maintain focus and momentum`)
     } else {
       // General metrics
       const completionRate = tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100) : 0
       if (completionRate < 50) {
         metrics.push(`Build momentum with 3-5 quick wins`)
         metrics.push(`Establish daily task completion habit`)
       } else if (completionRate < 80) {
         metrics.push(`Maintain steady progress (${100 - completionRate}% remaining)`)
         metrics.push(`Focus on completing vs. starting new tasks`)
       } else {
         metrics.push(`Complete final ${tasks.filter(t => t.status !== 'Completed').length} task${tasks.filter(t => t.status !== 'Completed').length > 1 ? 's' : ''}`)
         metrics.push(`Prepare for project wrap-up`)
       }
       
       if (totalHours > 0) {
         metrics.push(`Stay within ${totalHours}h time budget`)
       }
     }

         return {
       priority,
       focusType,
       metrics: metrics.slice(0, 4), // Max 4 metrics
       urgentCount: overdueTasks.length + blockedTasks.length + todayTasks.length
     }
   }, [tasks, milestones, totalHours])

  // Update focus area when tasks/milestones change
  useEffect(() => {
    const focus = generateFocusArea()
    setFocusArea(focus)
  }, [generateFocusArea])

  // Template Import Functions (Phase 2B)
  const validateTemplate = (template: any): { isValid: boolean; error?: string } => {
    try {
      // Check basic structure
      if (!template || typeof template !== 'object') {
        return { isValid: false, error: 'Invalid template file format' }
      }

      // Check version
      if (!template.version || !['1.0', '2.0'].includes(template.version)) {
        return { isValid: false, error: 'Unsupported template version. Expected 1.0 or 2.0' }
      }

      // Check required fields for v2.0
      if (template.version === '2.0') {
        if (!template.metadata || !template.project || !Array.isArray(template.tasks) || !Array.isArray(template.milestones)) {
          return { isValid: false, error: 'Missing required template fields (metadata, project, tasks, milestones)' }
        }

        // Validate metadata
        if (!template.metadata.name || !template.metadata.author) {
          return { isValid: false, error: 'Template metadata must include name and author' }
        }
      }

      // Check legacy v1.0 format
      if (template.version === '1.0') {
        if (!template.projectData || !Array.isArray(template.tasks) || !Array.isArray(template.milestones)) {
          return { isValid: false, error: 'Invalid v1.0 template format' }
        }
      }

      return { isValid: true }
    } catch (error) {
      return { isValid: false, error: 'Failed to parse template file' }
    }
  }

  const convertRelativeDates = (template: any, baseDate: Date = new Date()): any => {
    try {
      const convertedTemplate = { ...template }

      // Convert project dates
      if (template.project) {
        if (template.project.start_date_offset_days !== undefined) {
          const startDate = new Date(baseDate)
          startDate.setDate(startDate.getDate() + template.project.start_date_offset_days)
          convertedTemplate.project.start_date = startDate.toISOString()
        }

        if (template.project.target_launch_date_offset_days !== undefined) {
          const launchDate = new Date(baseDate)
          launchDate.setDate(launchDate.getDate() + template.project.target_launch_date_offset_days)
          convertedTemplate.project.target_launch_date = launchDate.toISOString()
        }
      }

      // Convert task due dates
      if (template.tasks) {
        convertedTemplate.tasks = template.tasks.map((task: any) => {
          if (task.due_date_offset_days !== undefined) {
            const dueDate = new Date(baseDate)
            dueDate.setDate(dueDate.getDate() + task.due_date_offset_days)
            return { ...task, due_date: dueDate.toISOString() }
          }
          return task
        })
      }

      // Convert milestone target dates
      if (template.milestones) {
        convertedTemplate.milestones = template.milestones.map((milestone: any) => {
          if (milestone.target_date_offset_days !== undefined) {
            const targetDate = new Date(baseDate)
            targetDate.setDate(targetDate.getDate() + milestone.target_date_offset_days)
            return { ...milestone, target_date: targetDate.toISOString() }
          }
          return milestone
        })
      }

      return convertedTemplate
    } catch (error) {
      console.error('Error converting relative dates:', error)
      return template
    }
  }

  const handleFileUpload = async (file: File) => {
    setImportError(null)
    try {
      const text = await file.text()
      const template = JSON.parse(text)
      
      const validation = validateTemplate(template)
      if (!validation.isValid) {
        setImportError(validation.error || 'Invalid template')
        return
      }

      // Convert relative dates to actual dates
      const processedTemplate = convertRelativeDates(template)
      setImportedTemplate(processedTemplate)
      setShowTemplatePreview(true)
    } catch (error) {
      setImportError('Failed to read template file. Please ensure it\'s a valid JSON file.')
    }
  }

  const handleImportTemplate = async () => {
    if (!importedTemplate || !user) return

    setIsImporting(true)
    setImportError(null)

    try {
      if (importMode === 'new-project') {
        // Create new project from template
        const projectData = importedTemplate.project || importedTemplate.projectData
        const project = await db.createProject({
          user_id: user.id,
          name: projectData.name || importedTemplate.metadata?.name || 'Imported Project',
          description: projectData.description || importedTemplate.metadata?.description || '',
          start_date: projectData.start_date || new Date().toISOString(),
          target_launch_date: projectData.target_launch_date,
          current_sprint: projectData.current_sprint || 1,
          total_sprints: projectData.total_sprints || 16
        })

        if (project) {
          // Set as active project
          setCurrentProject(project)
          setActiveProjectId(project.id)
          setProjects(prev => [...prev, project])
          setProjectData({
            projectName: project.name,
            startDate: project.start_date,
            targetLaunchDate: project.target_launch_date,
            description: project.description || '',
            currentSprint: project.current_sprint,
            totalSprints: project.total_sprints
          })

          // Import milestones
          const importedMilestones = []
          for (const milestoneData of importedTemplate.milestones || []) {
            const milestone = await db.createMilestone({
              project_id: project.id,
              user_id: user.id,
              title: milestoneData.title,
              description: milestoneData.description || '',
              target_date: milestoneData.target_date,
              status: 'Not Started',
              progress: 0
            })

            if (milestone) {
              importedMilestones.push({
                id: milestone.id,
                title: milestone.title,
                description: milestone.description || '',
                targetDate: milestone.target_date,
                status: milestone.status,
                progress: milestone.progress,
                createdAt: milestone.created_at,
                tasks: []
              })
            }
          }

          // Import tasks
          const importedTasks = []
          for (const taskData of importedTemplate.tasks || []) {
            const task = await db.createTask({
              project_id: project.id,
              user_id: user.id,
              title: taskData.title,
              description: taskData.description || '',
              category: taskData.category || 'Development',
              priority: taskData.priority || 'Medium',
              status: 'Not Started',
              estimated_hours: taskData.estimated_hours || 0,
              actual_hours: 0,
              due_date: taskData.due_date,
              sprint_week: taskData.sprint_week || 1
            })

            if (task) {
              importedTasks.push({
                id: task.id,
                title: task.title,
                description: task.description || '',
                category: task.category,
                priority: task.priority,
                status: task.status,
                estimatedHours: task.estimated_hours,
                actualHours: task.actual_hours,
                dueDate: task.due_date,
                createdAt: task.created_at,
                sprintWeek: task.sprint_week
              })
            }
          }

          setMilestones(importedMilestones)
          setTasks(importedTasks)
        }

      } else {
        // Replace current project data
        if (!currentProject) {
          setImportError('No active project to replace')
          return
        }

                 // Clear existing tasks (milestones will be replaced by creating new ones)
         for (const task of tasks) {
           await db.deleteTask(task.id, user.id)
         }
         // Note: Milestone deletion would require additional database method
         // For now, new milestones will be added alongside existing ones

        // Update project info
        const projectData = importedTemplate.project || importedTemplate.projectData
        if (projectData) {
          await db.updateProject(currentProject.id, {
            name: projectData.name || currentProject.name,
            description: projectData.description,
            target_launch_date: projectData.target_launch_date,
            total_sprints: projectData.total_sprints || currentProject.total_sprints
          })

          setProjectData(prev => ({
            ...prev,
            projectName: projectData.name || prev.projectName,
            description: projectData.description || prev.description,
            targetLaunchDate: projectData.target_launch_date || prev.targetLaunchDate,
            totalSprints: projectData.total_sprints || prev.totalSprints
          }))
        }

        // Import new milestones and tasks (same logic as above)
        const importedMilestones = []
        for (const milestoneData of importedTemplate.milestones || []) {
          const milestone = await db.createMilestone({
            project_id: currentProject.id,
            user_id: user.id,
            title: milestoneData.title,
            description: milestoneData.description || '',
            target_date: milestoneData.target_date,
            status: 'Not Started',
            progress: 0
          })

          if (milestone) {
            importedMilestones.push({
              id: milestone.id,
              title: milestone.title,
              description: milestone.description || '',
              targetDate: milestone.target_date,
              status: milestone.status,
              progress: milestone.progress,
              createdAt: milestone.created_at,
              tasks: []
            })
          }
        }

        const importedTasks = []
        for (const taskData of importedTemplate.tasks || []) {
          const task = await db.createTask({
            project_id: currentProject.id,
            user_id: user.id,
            title: taskData.title,
            description: taskData.description || '',
            category: taskData.category || 'Development',
            priority: taskData.priority || 'Medium',
            status: 'Not Started',
            estimated_hours: taskData.estimated_hours || 0,
            actual_hours: 0,
            due_date: taskData.due_date,
            sprint_week: taskData.sprint_week || 1
          })

          if (task) {
            importedTasks.push({
              id: task.id,
              title: task.title,
              description: task.description || '',
              category: task.category,
              priority: task.priority,
              status: task.status,
              estimatedHours: task.estimated_hours,
              actualHours: task.actual_hours,
              dueDate: task.due_date,
              createdAt: task.created_at,
              sprintWeek: task.sprint_week
            })
          }
        }

        setMilestones(importedMilestones)
        setTasks(importedTasks)
      }

      // Close modals and reset state
      setShowImportModal(false)
      setShowTemplatePreview(false)
      setImportedTemplate(null)

    } catch (error) {
      console.error('Error importing template:', error)
      setImportError('Failed to import template. Please try again.')
    } finally {
      setIsImporting(false)
    }
  }

  const handleCloseImport = () => {
    setShowImportModal(false)
    setShowTemplatePreview(false)
    setImportedTemplate(null)
    setImportError(null)
  }

  const createNewProject = async (projectInfo: any) => {
    if (!user) return

    setIsCreatingProject(true)
    setError(null)
    try {
      const project = await db.createProject({
        user_id: user.id,
        name: projectInfo.name,
        description: projectInfo.description,
        start_date: projectInfo.startDate,
        target_launch_date: projectInfo.targetLaunchDate,
        current_sprint: 1,
        total_sprints: projectInfo.totalSprints || 16
      })

      if (project) {
        // Add to projects list and set as active
        setProjects(prev => [...prev, project])
        setCurrentProject(project)
        setActiveProjectId(project.id)
        setProjectData({
          projectName: project.name,
          startDate: project.start_date,
          targetLaunchDate: project.target_launch_date,
          description: project.description || '',
          currentSprint: project.current_sprint,
          totalSprints: project.total_sprints
        })
        setTasks([])
        setMilestones([])

        // Create the first milestone if provided
        if (projectInfo.milestoneTitle && projectInfo.milestoneTargetDate) {
          const milestone = await db.createMilestone({
            project_id: project.id,
            user_id: user.id,
            title: projectInfo.milestoneTitle,
            description: projectInfo.milestoneDescription || '',
            target_date: projectInfo.milestoneTargetDate,
            status: 'In Progress',
            progress: 0
          })

          if (milestone) {
            setMilestones([{
              id: milestone.id,
              title: milestone.title,
              description: milestone.description || '',
              targetDate: milestone.target_date,
              status: milestone.status,
              progress: milestone.progress,
              createdAt: milestone.created_at,
              tasks: []
            }])
          }
        }
      }
          } catch (error) {
        console.error('Error creating project:', error)
        setError('Failed to create project. Please try again.')
      } finally {
        setIsCreatingProject(false)
      }
    }

  const createNewTask = async (taskInfo: any) => {
    if (!user || !currentProject) return

    setIsCreatingTask(true)
    setError(null)
    try {
      const task = await db.createTask({
        project_id: currentProject.id,
        user_id: user.id,
        title: taskInfo.title,
        description: taskInfo.description,
        category: taskInfo.category,
        priority: taskInfo.priority,
        status: 'Not Started',
        estimated_hours: taskInfo.estimatedHours || 0,
        actual_hours: 0,
        due_date: taskInfo.dueDate,
        sprint_week: taskInfo.sprintWeek || 1
      })

      if (task) {
        const newTask = {
          id: task.id,
          title: task.title,
          description: task.description || '',
          category: task.category,
          priority: task.priority,
          status: task.status,
          estimatedHours: task.estimated_hours,
          actualHours: task.actual_hours,
          dueDate: task.due_date,
          createdAt: task.created_at,
          completedAt: task.completed_at || undefined,
          sprintWeek: task.sprint_week
        }
        setTasks(prev => [...prev, newTask])
      }
          } catch (error) {
        console.error('Error creating task:', error)
        setError('Failed to create task. Please try again.')
      } finally {
        setIsCreatingTask(false)
      }
    }

  const updateTaskInDb = useCallback(async (taskId: string, updates: Record<string, any>) => {
    if (!user) return

    try {
      const updatedTask = await db.updateTask(taskId, updates)
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.id === taskId 
            ? {
                ...task,
                title: updatedTask.title,
                description: updatedTask.description || '',
                category: updatedTask.category,
                priority: updatedTask.priority,
                status: updatedTask.status,
                estimatedHours: updatedTask.estimated_hours,
                actualHours: updatedTask.actual_hours,
                completedAt: updatedTask.completed_at || undefined
              }
            : task
        ))
      }
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }, [])

  // Removed unused deleteTaskFromDb function

  const handleSignOut = async () => {
    try {
      await signOut()
      // The useAuth hook will automatically handle state updates
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  
  const handleEditTask = useCallback((task: { id: string; title: string; description?: string; category: string; priority: string; status: string }) => {
    setEditingTask(task)
    setShowEditModal(true)
  }, [])

  const handleDeleteTask = useCallback((task: { id: string; title: string }) => {
    setTaskToDelete(task)
    setShowDeleteConfirmation(true)
  }, [])

  const handleConfirmDeleteTask = async () => {
    if (!user || !taskToDelete) return

    setIsDeletingTask(true)
    setError(null)
    try {
      await db.deleteTask(taskToDelete.id, user.id)
      
      // Remove task from local state
      setTasks(prev => prev.filter(t => t.id !== taskToDelete.id))
      
      // Close confirmation dialog
      setShowDeleteConfirmation(false)
      setTaskToDelete(null)
    } catch (error) {
      console.error('Error deleting task:', error)
      setError('Failed to delete task. Please try again.')
    } finally {
      setIsDeletingTask(false)
    }
  }

  const handleCancelDeleteTask = () => {
    setShowDeleteConfirmation(false)
    setTaskToDelete(null)
  }

  // Memoized event handlers to prevent unnecessary re-renders
  const handleClearFilters = useCallback(() => {
    setSearchTerm('')
    setStatusFilter('all')
    setPriorityFilter('all')
    setCategoryFilter('all')
  }, [])

  const handleToggleSelect = useCallback((task: { id: string }) => {
    setSelectedTasks(prev => 
      prev.includes(task.id) 
        ? prev.filter(id => id !== task.id)
        : [...prev, task.id]
    )
  }, [])

  const handleDeselectAll = useCallback(() => {
    setSelectedTasks([])
  }, [])

  const handleBulkStatusChange = async (newStatus: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked') => {
    if (!user || selectedTasks.length === 0) return

    setIsBulkOperating(true)
    setError(null)
    try {
      // Update all selected tasks
      await Promise.all(
        selectedTasks.map(taskId => 
          db.updateTask(taskId, { status: newStatus, user_id: user.id })
        )
      )
      
      // Update local state
      setTasks(prev => prev.map(task => 
        selectedTasks.includes(task.id) 
          ? { ...task, status: newStatus }
          : task
      ))
      
      // Clear selection
      setSelectedTasks([])
    } catch (error) {
      console.error('Error updating tasks:', error)
      setError('Failed to update tasks. Please try again.')
    } finally {
      setIsBulkOperating(false)
    }
  }

  const handleBulkPriorityChange = async (newPriority: 'High' | 'Medium' | 'Low') => {
    if (!user || selectedTasks.length === 0) return

    setIsBulkOperating(true)
    setError(null)
    try {
      // Update all selected tasks
      await Promise.all(
        selectedTasks.map(taskId => 
          db.updateTask(taskId, { priority: newPriority, user_id: user.id })
        )
      )
      
      // Update local state
      setTasks(prev => prev.map(task => 
        selectedTasks.includes(task.id) 
          ? { ...task, priority: newPriority }
          : task
      ))
      
      // Clear selection
      setSelectedTasks([])
    } catch (error) {
      console.error('Error updating tasks:', error)
      setError('Failed to update tasks. Please try again.')
    } finally {
      setIsBulkOperating(false)
    }
  }

  const handleBulkDelete = () => {
    setShowBulkDeleteConfirmation(true)
  }

  const handleConfirmBulkDelete = async () => {
    if (!user || selectedTasks.length === 0) return

    setIsBulkOperating(true)
    setError(null)
    try {
      // Delete all selected tasks
      await Promise.all(
        selectedTasks.map(taskId => 
          db.deleteTask(taskId, user.id)
        )
      )
      
      // Remove tasks from local state
      setTasks(prev => prev.filter(task => !selectedTasks.includes(task.id)))
      
      // Clear selection and close confirmation
      setSelectedTasks([])
      setShowBulkDeleteConfirmation(false)
    } catch (error) {
      console.error('Error deleting tasks:', error)
      setError('Failed to delete tasks. Please try again.')
    } finally {
      setIsBulkOperating(false)
    }
  }

  const handleCancelBulkDelete = () => {
    setShowBulkDeleteConfirmation(false)
  }

  // Export handlers
  const handleExportTasks = useCallback((format: ExportFormat) => {
    try {
      console.log('Exporting tasks:', { count: filteredTasks.length, format, projectName: projectData.projectName })
      exportTasks(filteredTasks, format, projectData.projectName || 'Untitled_Project')
    } catch (error) {
      console.error('Error exporting tasks:', error)
      setError('Failed to export tasks. Please try again.')
    }
  }, [filteredTasks, projectData.projectName])

  const handleExportMilestones = useCallback((format: ExportFormat) => {
    try {
      console.log('Exporting milestones:', { count: milestones.length, format, projectName: projectData.projectName })
      exportMilestones(milestones, format, projectData.projectName || 'Untitled_Project')
    } catch (error) {
      console.error('Error exporting milestones:', error)
      setError('Failed to export milestones. Please try again.')
    }
  }, [milestones, projectData.projectName])

  const handleExportProject = useCallback((format: ExportFormat) => {
    try {
      console.log('Exporting project:', { 
        tasksCount: tasks.length, 
        milestonesCount: milestones.length, 
        format, 
        projectName: projectData.projectName 
      })
      exportProject(projectData, tasks, milestones, format)
    } catch (error) {
      console.error('Error exporting project:', error)
      setError('Failed to export project. Please try again.')
    }
  }, [projectData, tasks, milestones])

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setEditingTask(null)
  }

  const handleAddTask = () => {
    setShowAddModal(true)
  }

  // Removed unused handleCloseAddModal function

  const handleAddMilestone = () => {
    setShowAddMilestoneModal(true)
  }

  const handleCloseAddMilestoneModal = () => {
    setShowAddMilestoneModal(false)
  }

  const handleCreateProject = () => {
    setShowProjectSetup(true)
  }

  const handleCloseProjectSetup = () => {
    setShowProjectSetup(false)
  }

  const handleResetData = () => {
    setShowResetConfirmation(true)
  }

  const handleConfirmReset = async () => {
    if (!user) return

    try {
      await db.resetAllUserData(user.id)
      
      // Reset local state
      setCurrentProject(null)
      setTasks([])
      setMilestones([])
      setProjectData({
        projectName: '',
        startDate: '',
        targetLaunchDate: '',
        description: '',
        currentSprint: 1,
        totalSprints: 16
      })
      
      setShowResetConfirmation(false)
      setActiveTab('dashboard') // Go back to dashboard
    } catch (error) {
      console.error('Error resetting data:', error)
      alert('Failed to reset data. Please try again.')
    }
  }

  const handleCancelReset = () => {
    setShowResetConfirmation(false)
  }

  const handleEditMilestone = (milestone: any) => {
    setEditingMilestone(milestone)
    setShowEditMilestoneModal(true)
  }

  const handleCloseEditMilestoneModal = () => {
    setEditingMilestone(null)
    setShowEditMilestoneModal(false)
  }

  const updateProjectName = async (newName: string) => {
    if (!user || !currentProject || !newName.trim()) return

    try {
      await db.updateProject(currentProject.id, { name: newName.trim() })
      
      setProjectData(prev => ({ ...prev, projectName: newName.trim() }))
      setCurrentProject((prev: any) => ({ ...prev, name: newName.trim() }))
      setEditingProjectName(false)
    } catch (error) {
      console.error('Error updating project name:', error)
    }
  }

  const handleDragStart = useCallback((e: React.DragEvent, task: any) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent, newStatus: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked') => {
    e.preventDefault()
    if (draggedTask) {
      // Update UI immediately for better UX
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === draggedTask.id 
            ? { ...task, status: newStatus }
            : task
        )
      )
      
      // Update in database
      await updateTaskInDb(draggedTask.id, { status: newStatus })
      setDraggedTask(null)
    }
  }, [draggedTask, updateTaskInDb])

  const handleDragEnd = useCallback(() => {
    setDraggedTask(null)
  }, [])

  // DatePicker component
  const DatePicker = ({ value, onChange, placeholder = "Pick a date", name }: {
    value?: Date;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    name?: string;
  }) => {
    const [open, setOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value)

    // Sync internal state with value prop
    React.useEffect(() => {
      setSelectedDate(value)
    }, [value])

    const handleDateSelect = (date: Date | undefined) => {
      setSelectedDate(date)
      if (onChange) {
        onChange(date)
      }
      setOpen(false)
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal cursor-pointer"
            onClick={() => setOpen(!open)}
            type="button"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, 'PPP') : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-[70]" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
        {name && (
          <input
            type="hidden"
            name={name}
            value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
          />
        )}
      </Popover>
    )
  }

  const TabButton = ({ id, label, icon: Icon, active, onClick }: {
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    active: boolean;
    onClick: (id: string) => void;
  }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 focus:ring-2 focus:ring-gray-500 focus:outline-none ${
        active 
          ? 'text-gray-900 border-gray-900' 
          : 'text-gray-500 hover:text-gray-700 border-transparent'
      }`}
      role="tab"
      aria-selected={active}
      aria-controls={`${id}-panel`}
      id={`${id}-tab`}
      tabIndex={active ? 0 : -1}
    >
      <Icon size={16} aria-hidden="true" />
      {label}
    </button>
  )

  // Removed unused ProgressBar component

  const StatusBadge = ({ status, className = '' }: {
    status: string;
    className?: string;
  }) => {
    const styles = {
      'on-track': 'bg-green-100 text-green-800',
      'upcoming': 'bg-gray-100 text-gray-800',
      'completed': 'bg-green-100 text-green-800',
      'Not Started': 'bg-gray-100 text-gray-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800',
      'High': 'bg-gray-800 text-white',
      'Medium': 'bg-gray-600 text-white',
      'Low': 'bg-gray-400 text-white',
      'high': 'bg-gray-900 text-white',
      'medium': 'bg-gray-600 text-white',
      'low': 'bg-gray-400 text-white'
    }
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'} ${className}`}>
        {status}
      </span>
    )
  }

  const EditTaskModal = () => {
    // Always call hooks at the top level
    const [editFormData, setEditFormData] = useState({
      title: editingTask?.title || '',
      category: editingTask?.category || 'Development',
      status: editingTask?.status || 'Not Started',
      priority: editingTask?.priority || 'Medium',
      estimatedHours: editingTask?.estimatedHours || 0,
      actualHours: editingTask?.actualHours || 0,
      notes: editingTask?.notes || '',
      dueDate: editingTask?.dueDate ? new Date(editingTask.dueDate) : undefined
    })

    // Update form data when editingTask changes
    React.useEffect(() => {
      if (editingTask) {
        setEditFormData({
          title: editingTask.title || '',
          category: editingTask.category || 'Development',
          status: editingTask.status || 'Not Started',
          priority: editingTask.priority || 'Medium',
          estimatedHours: editingTask.estimatedHours || 0,
          actualHours: editingTask.actualHours || 0,
          notes: editingTask.notes || '',
          dueDate: editingTask.dueDate ? new Date(editingTask.dueDate) : undefined
        })
      }
    }, [editingTask])

    if (!editingTask) return null

    const handleUpdateTask = async () => {
      if (!editingTask.id) return

      try {
        await updateTaskInDb(editingTask.id, {
          title: editFormData.title,
          category: editFormData.category,
          status: editFormData.status,
          priority: editFormData.priority,
          estimated_hours: editFormData.estimatedHours,
          actual_hours: editFormData.actualHours,
          due_date: editFormData.dueDate ? editFormData.dueDate.toISOString() : null
        })

        // Update local state
        setTasks(prev => prev.map(task => 
          task.id === editingTask.id 
            ? { 
                ...task, 
                ...editFormData, 
                estimatedHours: editFormData.estimatedHours, 
                actualHours: editFormData.actualHours,
                dueDate: editFormData.dueDate ? editFormData.dueDate.toISOString() : undefined
              }
            : task
        ))

        handleCloseEditModal()
      } catch (error) {
        console.error('Error updating task:', error)
      }
    }

    return (
      <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-50">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Edit Task</h2>
              <p className="text-sm text-gray-500 mt-1">Update task details and progress.</p>
            </div>
            <button
              onClick={handleCloseEditModal}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Task Title</label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
                  <Select 
                    value={editFormData.category} 
                    onValueChange={(value) => setEditFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Testing">Testing</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Strategy">Strategy</SelectItem>
                      <SelectItem value="Communication">Communication</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Misc">Misc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Status</label>
                  <Select 
                    value={editFormData.status} 
                    onValueChange={(value) => setEditFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Estimated Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Estimated Hours</label>
                  <input
                    type="number"
                    value={editFormData.estimatedHours}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, estimatedHours: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {/* Actual Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Actual Hours</label>
                  <input
                    type="number"
                    value={editFormData.actualHours}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, actualHours: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Priority</label>
                <Select 
                  value={editFormData.priority} 
                  onValueChange={(value) => setEditFormData(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-[100]">
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Due Date</label>
                <DatePicker
                  value={editFormData.dueDate}
                  onChange={(date) => setEditFormData(prev => ({ ...prev, dueDate: date }))}
                  placeholder="Select due date"
                  name="dueDate"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Notes</label>
                <textarea
                  rows={4}
                  value={editFormData.notes}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any additional notes or details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateTask}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium"
                >
                  Update Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const createNewMilestone = async (milestoneInfo: any) => {
    if (!user || !currentProject) return

    setIsCreatingMilestone(true)
    setError(null)
    try {
      const milestone = await db.createMilestone({
        project_id: currentProject.id,
        user_id: user.id,
        title: milestoneInfo.title,
        description: milestoneInfo.description,
        target_date: milestoneInfo.targetDate,
        status: 'Not Started',
        progress: 0
      })

      if (milestone) {
        const newMilestone = {
          id: milestone.id,
          title: milestone.title,
          description: milestone.description || '',
          targetDate: milestone.target_date,
          status: milestone.status,
          progress: milestone.progress,
          createdAt: milestone.created_at,
          tasks: []
        }
        setMilestones(prev => [...prev, newMilestone])
      }
          } catch (error) {
        console.error('Error creating milestone:', error)
        setError('Failed to create milestone. Please try again.')
      } finally {
        setIsCreatingMilestone(false)
      }
    }

  const EditMilestoneModal = () => {
    // Always call hooks at the top level
    const [editFormData, setEditFormData] = useState({
      title: editingMilestone?.title || '',
      description: editingMilestone?.description || '',
      targetDate: editingMilestone?.targetDate || ''
    })

    // Update form data when editingMilestone changes
    React.useEffect(() => {
      if (editingMilestone) {
        setEditFormData({
          title: editingMilestone.title || '',
          description: editingMilestone.description || '',
          targetDate: editingMilestone.targetDate || ''
        })
      }
    }, [editingMilestone])

    if (!editingMilestone) return null

    // Calculate dynamic status and progress based on related tasks
    const relatedTasks = tasks.filter(task => {
      const taskDate = new Date(task.dueDate)
      const milestoneDate = new Date(editingMilestone.targetDate)
      const daysDiff = Math.abs((taskDate.getTime() - milestoneDate.getTime()) / (1000 * 3600 * 24))
      return daysDiff <= 7 // Tasks within 7 days of milestone
    })

    const completedRelatedTasks = relatedTasks.filter(task => task.status === 'Completed').length
    const calculatedProgress = relatedTasks.length > 0 ? Math.round((completedRelatedTasks / relatedTasks.length) * 100) : 0
    
    const calculatedStatus = calculatedProgress === 100 ? 'Completed' : 
                           calculatedProgress > 0 ? 'In Progress' : 
                           'Not Started'

    const handleUpdateMilestone = async () => {
      if (!editingMilestone.id) return

      try {
        await db.updateMilestone(editingMilestone.id, {
          title: editFormData.title,
          description: editFormData.description,
          target_date: editFormData.targetDate,
          status: calculatedStatus,
          progress: calculatedProgress
        })

        // Update local state
        setMilestones(prev => prev.map(milestone => 
          milestone.id === editingMilestone.id 
            ? { 
                ...milestone, 
                title: editFormData.title,
                description: editFormData.description,
                targetDate: editFormData.targetDate,
                status: calculatedStatus,
                progress: calculatedProgress,
                createdAt: milestone.createdAt // Preserve existing createdAt
              }
            : milestone
        ))

        handleCloseEditMilestoneModal()
      } catch (error) {
        console.error('Error updating milestone:', error)
      }
    }

    return (
      <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Edit Milestone</h2>
              <p className="text-sm text-gray-500 mt-1">Update milestone details and progress.</p>
            </div>
            <button
              onClick={handleCloseEditMilestoneModal}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Milestone Title</label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={editFormData.description}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe this milestone..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                />
              </div>

              {/* Target Date */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Target Date</label>
                <DatePicker
                  value={editFormData.targetDate ? new Date(editFormData.targetDate) : undefined}
                  onChange={(date: Date | undefined) => setEditFormData(prev => ({ ...prev, targetDate: date ? date.toISOString().split('T')[0] : '' }))}
                  placeholder="Select target date"
                />
              </div>

              {/* Auto-calculated Status and Progress */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Status</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <StatusBadge status={calculatedStatus.toLowerCase().replace(' ', '-')} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Auto-calculated based on related tasks</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Progress</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{calculatedProgress}%</span>
                      <span className="text-sm text-gray-500">
                        {completedRelatedTasks}/{relatedTasks.length} tasks
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gray-800 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${calculatedProgress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Based on tasks due within 7 days</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={handleCloseEditMilestoneModal}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateMilestone}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium"
                >
                  Update Milestone
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const AddMilestoneModal = () => {
    const [targetDate, setTargetDate] = useState<Date | undefined>(undefined)

    if (!showAddMilestoneModal) return null

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)
      
      const milestoneInfo = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        targetDate: targetDate ? targetDate.toISOString().split('T')[0] : ''
      }

      if (!milestoneInfo.title || !milestoneInfo.targetDate) {
        alert('Please fill in all required fields')
        return
      }

      await createNewMilestone(milestoneInfo)
      setShowAddMilestoneModal(false)
      setTargetDate(undefined) // Reset form
    }

    return (
      <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center z-[60] p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Milestone</h2>
              <p className="text-sm text-gray-500 mt-1">Create a new milestone to track project progress.</p>
            </div>
            <button
              onClick={handleCloseAddMilestoneModal}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Milestone Title *</label>
              <input
                type="text"
                name="title"
                placeholder="e.g., MVP Development, Beta Launch, Public Launch"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Describe what this milestone will accomplish..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Target Date *</label>
              <DatePicker
                name="targetDate"
                placeholder="Select target date"
                value={targetDate}
                onChange={setTargetDate}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCloseAddMilestoneModal}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Create Milestone
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const ProjectSetupModal = () => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined)
    const [targetLaunchDate, setTargetLaunchDate] = useState<Date | undefined>(undefined)
    const [milestoneTargetDate, setMilestoneTargetDate] = useState<Date | undefined>(undefined)

    if (!showProjectSetup) return null

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)
      
      const projectInfo = {
        name: formData.get('projectName') as string,
        description: formData.get('description') as string,
        startDate: startDate ? startDate.toISOString().split('T')[0] : '',
        targetLaunchDate: targetLaunchDate ? targetLaunchDate.toISOString().split('T')[0] : '',
        totalSprints: parseInt(formData.get('totalSprints') as string) || 16,
        milestoneTitle: formData.get('milestoneTitle') as string,
        milestoneDescription: formData.get('milestoneDescription') as string,
        milestoneTargetDate: milestoneTargetDate ? milestoneTargetDate.toISOString().split('T')[0] : ''
      }

      await createNewProject(projectInfo)
      setShowProjectSetup(false)
      // Reset form
      setStartDate(undefined)
      setTargetLaunchDate(undefined)
      setMilestoneTargetDate(undefined)
    }

    return (
      <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Create Your First Project</h2>
              <p className="text-sm text-gray-500 mt-1">Set up your project to start tracking progress.</p>
            </div>
            <button
              onClick={handleCloseProjectSetup}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Project Name *</label>
              <input
                type="text"
                name="projectName"
                placeholder="e.g., My SaaS App, E-commerce Platform"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Brief description of your project..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Start Date *</label>
                <DatePicker
                  name="startDate"
                  placeholder="Select start date"
                  value={startDate}
                  onChange={setStartDate}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Target Launch Date *</label>
                <DatePicker
                  name="targetLaunchDate"
                  placeholder="Select launch date"
                  value={targetLaunchDate}
                  onChange={setTargetLaunchDate}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Total Sprints</label>
              <input
                type="number"
                name="totalSprints"
                min={1}
                max={52}
                placeholder="16"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">How many weekly sprints do you plan for this project?</p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">First Milestone</h3>
              <p className="text-sm text-gray-600 mb-4">Set up your first milestone to track initial progress</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Milestone Title *</label>
                  <input
                    type="text"
                    name="milestoneTitle"
                    placeholder="e.g., Foundation & Setup, MVP Development"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Milestone Description</label>
                  <textarea
                    name="milestoneDescription"
                    rows={2}
                    placeholder="Describe what this milestone will accomplish..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Milestone Target Date *</label>
                  <DatePicker
                    name="milestoneTargetDate"
                    placeholder="Select milestone date"
                    value={milestoneTargetDate}
                    onChange={setMilestoneTargetDate}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCloseProjectSetup}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const AddTaskModal = () => {
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined)

    if (!showAddModal) return null

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)
      
      const taskInfo = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        priority: formData.get('priority') as string,
        estimatedHours: parseInt(formData.get('estimatedHours') as string) || 0,
        dueDate: dueDate ? dueDate.toISOString().split('T')[0] : '',
        sprintWeek: parseInt(formData.get('sprintWeek') as string) || 1
      }

      if (!taskInfo.title || !taskInfo.dueDate) {
        alert('Please fill in all required fields')
        return
      }

      await createNewTask(taskInfo)
      setShowAddModal(false)
      setDueDate(undefined) // Reset form
    }

    return (
      <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Task</h2>
              <p className="text-sm text-gray-500 mt-1">Create a new task for your project.</p>
            </div>
            <button
              onClick={() => setShowAddModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter task title..."
                />
              </div>

              {/* Task Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Enter task description..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
                  <Select name="category" defaultValue="Development">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Testing">Testing</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Strategy">Strategy</SelectItem>
                      <SelectItem value="Communication">Communication</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Misc">Misc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Priority</label>
                  <Select name="priority" defaultValue="Medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Estimated Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Estimated Hours
                  </label>
                  <input
                    type="number"
                    name="estimatedHours"
                    min="0"
                    step="0.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="0"
                  />
                </div>

                {/* Sprint Week */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Sprint Week
                  </label>
                  <input
                    type="number"
                    name="sprintWeek"
                    min="1"
                    defaultValue="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Due Date *
                </label>
                <DatePicker
                  name="dueDate"
                  placeholder="Select due date"
                  value={dueDate}
                  onChange={setDueDate}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const TaskManagementModal = () => (
    <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Task Management</h2>
            <p className="text-sm text-gray-500 mt-1">Add, edit, and manage your tasks for Week 1</p>
          </div>
          <button
            onClick={() => setShowTaskModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Add New Task Button */}
          <button 
            onClick={handleAddTask}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 mb-6"
          >
            <Plus size={18} />
            Add New Task
          </button>

          {/* Task List */}
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-gray-50 rounded-lg border p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className="flex items-center pt-1">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                  </div>

                  {/* Category Icon */}
                  <div className="flex items-center pt-1">
                    {(() => {
                      const CategoryIcon = getCategoryIcon(task.category)
                      return <CategoryIcon size={16} className="text-gray-400" />
                    })()}
                  </div>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
                    
                    {/* Tags and Time */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <StatusBadge status={task.priority.toLowerCase()} />
                      <span className="text-sm text-gray-500">0h / {task.estimatedHours}h</span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium border border-gray-300">
                        {task.category}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEditTask(task)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Edit size={16} className="text-gray-500" />
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Import Modal Components (Phase 2B)
  const FileUploadModal = () => {
    const [dragActive, setDragActive] = useState(false)

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true)
      } else if (e.type === "dragleave") {
        setDragActive(false)
      }
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileUpload(e.dataTransfer.files[0])
      }
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFileUpload(e.target.files[0])
      }
    }

    return (
      <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative z-50">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Import Template</h2>
              <p className="text-sm text-gray-500 mt-1">Upload a project template file</p>
            </div>
            <button
              onClick={handleCloseImport}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {importError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{importError}</p>
              </div>
            )}

            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drop your template file here
              </h3>
              <p className="text-gray-500 mb-4">
                or click to browse for a JSON template file
              </p>
              
              <input
                type="file"
                accept=".json"
                onChange={handleFileInput}
                className="hidden"
                id="template-upload"
              />
              <label
                htmlFor="template-upload"
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer inline-flex items-center gap-2"
              >
                <Upload size={16} />
                Choose File
              </label>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              <p>Supported formats: JSON template files (v1.0 or v2.0)</p>
              <p>File size limit: 10MB</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const TemplatePreviewModal = () => {
    if (!importedTemplate) return null

    const template = importedTemplate
    const isV2 = template.version === '2.0'

    return (
      <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-50">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Template Preview</h2>
              <p className="text-sm text-gray-500 mt-1">Review template before importing</p>
            </div>
            <button
              onClick={handleCloseImport}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {/* Template Metadata */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Template Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <p className="text-sm text-gray-900">
                      {isV2 ? template.metadata?.name : template.projectData?.name || 'Untitled'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Version:</span>
                    <p className="text-sm text-gray-900">{template.version}</p>
                  </div>
                  {isV2 && (
                    <>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Author:</span>
                        <p className="text-sm text-gray-900">{template.metadata?.author}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Difficulty:</span>
                        <p className="text-sm text-gray-900">{template.metadata?.difficulty}</p>
                      </div>
                    </>
                  )}
                </div>
                {isV2 && template.metadata?.description && (
                  <div className="mt-3">
                    <span className="text-sm font-medium text-gray-600">Description:</span>
                    <p className="text-sm text-gray-900 mt-1">{template.metadata.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Content Summary */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  Tasks ({template.tasks?.length || 0})
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {template.tasks?.slice(0, 5).map((task: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded p-2">
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <p className="text-xs text-gray-500">
                        {task.category} • {task.priority} Priority
                      </p>
                    </div>
                  ))}
                  {(template.tasks?.length || 0) > 5 && (
                    <p className="text-xs text-gray-500">
                      ...and {(template.tasks?.length || 0) - 5} more tasks
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  Milestones ({template.milestones?.length || 0})
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {template.milestones?.slice(0, 5).map((milestone: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded p-2">
                      <p className="text-sm font-medium text-gray-900">{milestone.title}</p>
                      {milestone.description && (
                        <p className="text-xs text-gray-500">{milestone.description}</p>
                      )}
                    </div>
                  ))}
                  {(template.milestones?.length || 0) > 5 && (
                    <p className="text-xs text-gray-500">
                      ...and {(template.milestones?.length || 0) - 5} more milestones
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Import Options */}
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-900 mb-3">Import Options</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="new-project"
                    checked={importMode === 'new-project'}
                    onChange={(e) => setImportMode(e.target.value as 'new-project' | 'replace-current')}
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Create New Project</p>
                    <p className="text-sm text-gray-500">
                      Import as a brand new project (recommended)
                    </p>
                  </div>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="replace-current"
                    checked={importMode === 'replace-current'}
                    onChange={(e) => setImportMode(e.target.value as 'new-project' | 'replace-current')}
                    className="mr-3"
                    disabled={!currentProject}
                  />
                  <div>
                    <p className={`font-medium ${!currentProject ? 'text-gray-400' : 'text-gray-900'}`}>
                      Replace Current Project
                    </p>
                    <p className="text-sm text-gray-500">
                      {!currentProject 
                        ? 'No active project to replace' 
                        : 'Replace all tasks and milestones in current project'
                      }
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t mt-6">
              <button
                onClick={handleCloseImport}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                disabled={isImporting}
              >
                Cancel
              </button>
              <LoadingButton
                onClick={handleImportTemplate}
                loading={isImporting}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium"
              >
                Import Template
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const ResetConfirmationModal = () => {
    if (!showResetConfirmation) return null

    return (
      <div className="fixed inset-0 bg-gray-200/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* Modal Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Reset All Data</h2>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to reset all your data? This will permanently delete:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• All projects</li>
                <li>• All tasks</li>
                <li>• All milestones</li>
                <li>• All progress tracking</li>
              </ul>
              <p className="text-red-600 text-sm mt-4 font-medium">
                This action cannot be undone. You will start with a completely clean slate.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelReset}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
              >
                Yes, Reset All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show auth form if not authenticated
  if (!user) {
    return <AuthForm onAuthSuccess={() => {}} />
  }

    return (
    <div className="min-h-screen bg-gray-50">
      <ErrorBanner error={error} onDismiss={() => setError(null)} />
      <LoadingOverlay isLoading={isLoading} />
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Project Info */}
            <div>
              {editingProjectName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue={projectData.projectName || 'Untitled'}
                    onBlur={(e) => updateProjectName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        updateProjectName(e.currentTarget.value)
                      } else if (e.key === 'Escape') {
                        setEditingProjectName(false)
                      }
                    }}
                    autoFocus
                    className="text-xl font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:border-gray-900 outline-none"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold text-gray-900">
                    {projectData.projectName || 'Untitled'}
                  </h1>
                  <button
                    onClick={() => setEditingProjectName(true)}
                    className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                    title="Edit project name"
                  >
                    <Edit size={14} />
                  </button>
                </div>
              )}
              <p className="text-sm text-gray-500 mt-0.5">
                {milestones.length > 0 
                  ? `Week ${projectData.currentSprint} • ${milestones[0].title}`
                  : `Week ${projectData.currentSprint} • No active milestone`
                }
              </p>
            </div>

            {/* Right Section - Stats and Actions */}
            <div className="flex items-center gap-6">
              {/* Progress Stats */}
              <div className="flex items-center gap-8 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-gray-200">
                    <div 
                      className="w-full h-full rounded-full border-2 border-gray-900 transition-all duration-500"
                      style={{
                        background: `conic-gradient(#111827 ${safePercentage(completedTasks, tasks.length) * 3.6}deg, transparent 0deg)`
                      }}
                    />
                  </div>
                  <div>
                    <div className="text-gray-500">Progress</div>
                    <div className="font-medium text-gray-900">{completedTasks}/{tasks.length} tasks</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <CalendarIcon size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="text-gray-500">Days left</div>
                    <div className="font-medium text-gray-900">
                      {daysUntilLaunch || 0} days
                      {daysUntilLaunch <= 7 && daysUntilLaunch > 0 && (
                        <span className="ml-1 text-xs text-gray-500">• Final sprint</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Select onValueChange={(value: ExportFormat) => {
                    if (value) {
                      handleExportProject(value)
                    }
                  }}>
                    <SelectTrigger className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 text-sm font-medium flex items-center gap-1.5 transition-colors border-none bg-transparent">
                      <Download size={14} />
                      Export
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">Export as JSON</SelectItem>
                      <SelectItem value="csv">Export as CSV</SelectItem>
                      <SelectItem value="template">Save as Template</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <LoadingButton
                  onClick={() => setShowTaskModal(true)}
                  loading={isCreatingTask}
                  icon={Plus}
                  iconSize={14}
                  size="sm"
                  variant="primary"
                >
                  Task Hub
                </LoadingButton>
                <button 
                  onClick={handleResetData}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded text-sm font-medium transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200" role="navigation" aria-label="Dashboard navigation">
        <div className="px-6">
          <div className="flex gap-0 -mb-px" role="tablist">
            <TabButton 
              id="dashboard" 
              label="Dashboard" 
              icon={BarChart3} 
              active={activeTab === 'dashboard'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="kanban" 
              label="Kanban" 
              icon={Kanban} 
              active={activeTab === 'kanban'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="analytics" 
              label="Analytics" 
              icon={TrendingUp} 
              active={activeTab === 'analytics'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="timeline" 
              label="Timeline" 
              icon={CalendarIcon} 
              active={activeTab === 'timeline'} 
              onClick={setActiveTab} 
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6 py-6" role="main" aria-labelledby="page-title">
        <div id="dashboard-panel" role="tabpanel" aria-labelledby="dashboard-tab" hidden={activeTab !== 'dashboard'}>
        {activeTab === 'dashboard' && (
          <>
            {/* Show welcome message if no project */}
            {!currentProject ? (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus size={24} className="text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Your Dashboard!</h2>
                  <p className="text-gray-600 mb-6">
                    Get started by creating your first project. Track your progress, manage tasks, and achieve your goals.
                  </p>
                  <LoadingButton
                    onClick={handleCreateProject}
                    loading={isCreatingProject}
                    icon={Plus}
                    iconSize={18}
                    size="lg"
                    variant="primary"
                    className="mx-auto"
                  >
                    Create Your First Project
                  </LoadingButton>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="font-medium text-gray-900 mb-3">What you can do:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <BarChart3 size={16} className="text-blue-500" />
                      <span>Track project progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckSquare size={16} className="text-green-500" />
                      <span>Manage tasks & sprints</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-purple-500" />
                      <span>Analyze productivity</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* This Week's Goals */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target size={18} className="text-gray-700" />
                  <h2 className="text-lg font-semibold">This Week's Goals</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {milestones.length > 0 
                    ? `Week ${projectData.currentSprint} • ${milestones[0].title}`
                    : `Week ${projectData.currentSprint} • No Active Milestone`
                  }
                </p>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900 font-medium">{completedTasks}/{tasks.length} tasks</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-800 h-2 rounded-full" style={{ width: `${safeWidth(completedTasks, tasks.length)}%` }}></div>
                  </div>
                </div>

                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3">
                      <div className="flex items-center gap-2 mt-1">
                        {(() => {
                          const CategoryIcon = getCategoryIcon(task.category)
                          return <CategoryIcon size={14} className="text-gray-400" />
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">{task.title}</p>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={task.priority.toLowerCase()} />
                          <span className="text-xs text-gray-500">0h / {task.estimatedHours}h</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Time Tracking</span>
                    <span className="text-gray-900 font-medium">0h / {totalHours}h</span>
                  </div>
                </div>
              </div>

              {/* Focus Area */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle size={18} className="text-gray-700" />
                  <h2 className="text-lg font-semibold">Focus Area</h2>
                  {focusArea.urgentCount > 0 && (
                    <div className="ml-auto">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {focusArea.urgentCount} urgent
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Top Priority Right Now</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {focusArea.priority}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Success Actions</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {focusArea.metrics.map((metric: string, index: number) => (
                      <li key={index} className="leading-relaxed">• {metric}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Middle Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Progress Overview */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 size={18} className="text-gray-700" />
                  <h2 className="text-lg font-semibold">Progress Overview</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Sprint Progress</span>
                      <span className="text-gray-900 font-medium">{safePercentage(completedTasks, tasks.length)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-800 h-2 rounded-full" style={{ width: `${safeWidth(completedTasks, tasks.length)}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Time Progress</span>
                      <span className="text-gray-900 font-medium">{safePercentage(completedHours, totalHours)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-800 h-2 rounded-full" style={{ width: `${safeWidth(completedHours, totalHours)}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Tasks by Category</h3>
                  {(() => {
                    // Group tasks by category
                    const categoryGroups = tasks.reduce((acc, task) => {
                      const category = task.category || 'Uncategorized'
                      if (!acc[category]) {
                        acc[category] = { total: 0, completed: 0 }
                      }
                      acc[category].total++
                      if (task.status === 'Completed') {
                        acc[category].completed++
                      }
                      return acc
                    }, {} as Record<string, { total: number; completed: number }>)

                    // Using shared category icon function

                                         return Object.entries(categoryGroups).length > 0 ? (
                       Object.entries(categoryGroups).map(([category, data]) => {
                         const categoryData = data as { total: number; completed: number }
                         const Icon = getCategoryIcon(category)
                        
                        return (
                          <div key={category} className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <Icon size={14} className="text-gray-600 flex-shrink-0" />
                              <span className="text-sm text-gray-600 truncate">{category}</span>
                            </div>
                            <div className="w-24 flex-shrink-0">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                 className="bg-gray-800 h-2 rounded-full" 
                                 style={{ width: `${safeWidth(categoryData.completed, categoryData.total)}%` }}
                               ></div>
                             </div>
                           </div>
                           <span className="text-sm text-gray-500 w-8 text-right flex-shrink-0">{categoryData.completed}/{categoryData.total}</span>
                          </div>
                        )
                      })
                    ) : (
                      <p className="text-sm text-gray-500">No tasks to categorize yet</p>
                    )
                  })()}
                </div>
              </div>

              {/* Project Timeline */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarIcon size={18} className="text-gray-700" />
                  <h2 className="text-lg font-semibold">Project Timeline</h2>
                </div>

                <div className="space-y-6">
                  {milestones.length > 0 ? milestones.map((milestone) => {
                    const isCompleted = milestone.status === 'Completed'
                    const isInProgress = milestone.status === 'In Progress'
                    
                    return (
                      <div key={milestone.id} className="flex items-start gap-3">
                        <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                          isCompleted ? 'bg-green-500' : isInProgress ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                            <StatusBadge status={
                              isCompleted ? "completed" : 
                              isInProgress ? "on-track" : 
                              "upcoming"
                            } />
                          </div>
                          <p className="text-sm text-gray-500 mb-3">
                            Due: {formatDate(milestone.targetDate)}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                isCompleted ? 'bg-green-500' : 
                                isInProgress ? 'bg-blue-500' : 
                                'bg-gray-300'
                              }`} 
                              style={{ width: `${milestone.progress}%` }}
                            ></div>
                          </div>
                          {milestone.description && (
                            <p className="text-xs text-gray-500 mt-2">{milestone.description}</p>
                          )}
                        </div>
                      </div>
                    )
                  }) : (
                    <div className="text-center py-8">
                      <CalendarIcon size={32} className="text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 mb-4">No milestones yet</p>
                      <LoadingButton
                        onClick={handleAddMilestone}
                        loading={isCreatingMilestone}
                        icon={Plus}
                        iconSize={16}
                        size="md"
                        variant="primary"
                        className="mx-auto"
                      >
                        Add Milestone
                      </LoadingButton>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Recent Wins */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={18} className="text-gray-700" />
                  <h2 className="text-lg font-semibold">Recent Wins</h2>
                </div>
                {recentWins.length === 0 ? (
                  <p className="text-sm text-gray-500">Complete your first task to see achievements here!</p>
                ) : (
                  <div className="space-y-3">
                    {recentWins.map((win) => {
                      const IconComponent = (() => {
                        switch (win.icon) {
                          case 'CheckCircle': return CheckCircle
                          case 'Target': return Target
                          case 'Activity': return Activity
                          case 'CalendarIcon': return CalendarIcon
                          case 'TrendingUp': return TrendingUp
                          case 'BarChart3': return BarChart3
                          case 'CheckSquare': return CheckSquare
                          default: return CheckCircle
                        }
                      })()
                      
                      return (
                        <div key={win.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`p-1.5 rounded-full bg-white ${win.color}`}>
                            <IconComponent size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 text-sm mb-1">{win.title}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">{win.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} className="text-gray-700" />
                  <h2 className="text-lg font-semibold">Quick Stats</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tasks Completed</span>
                    <span className="font-semibold text-gray-900">{completedTasks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Hours Logged</span>
                    <span className="font-semibold text-gray-900">{completedHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Completion Rate</span>
                    <span className="font-semibold text-gray-900">{safePercentage(completedTasks, tasks.length)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Blockers</span>
                    <span className={`font-semibold ${tasks.filter(task => task.status === 'Blocked').length > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {tasks.filter(task => task.status === 'Blocked').length}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <LoadingButton
                      onClick={handleAddTask}
                      loading={isCreatingTask}
                      icon={Plus}
                      iconSize={14}
                      size="sm"
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      Add Task
                    </LoadingButton>
                    <button 
                      onClick={() => setActiveTab('kanban')}
                      className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-2 text-gray-700"
                    >
                      <Kanban size={14} />
                      View Kanban
                    </button>
                    <button 
                      onClick={() => handleExportProject('json')}
                      className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-2 text-gray-700"
                      title="Export project data as JSON"
                    >
                      <Download size={14} />
                      Export Data
                    </button>
                    <button 
                      onClick={() => setShowImportModal(true)}
                      className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-2 text-gray-700"
                      title="Import project template"
                    >
                      <Upload size={14} />
                      Import Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )}
          </>
        )}
        </div>

        <div id="kanban-panel" role="tabpanel" aria-labelledby="kanban-tab" hidden={activeTab !== 'kanban'}>
        {activeTab === 'kanban' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Kanban Board</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowSelection(!showSelection)
                    setSelectedTasks([])
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                    showSelection 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {showSelection ? 'Exit Selection' : 'Select Tasks'}
                </button>
                <button 
                  onClick={() => setShowTaskModal(true)}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Task
                </button>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="mb-6">
              <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
                categoryFilter={categoryFilter}
                onCategoryFilterChange={setCategoryFilter}
                availableCategories={availableCategories}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
                onClearFilters={handleClearFilters}
                placeholder="Search tasks..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <KanbanColumn
                title="To Do"
                status="Not Started"
                tasks={filteredTasks}
                count={filteredTasks.filter(task => task.status === 'Not Started').length}
                draggedTask={draggedTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                bgColor="bg-gray-50"
                borderColor="border"
                dotColor="bg-gray-400"
                badgeColor="bg-gray-200 text-gray-700"
                selectedTasks={selectedTasks}
                onToggleSelect={handleToggleSelect}
                showSelection={showSelection}
              />

              <KanbanColumn
                title="In Progress"
                status="In Progress"
                tasks={filteredTasks}
                count={filteredTasks.filter(task => task.status === 'In Progress').length}
                draggedTask={draggedTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                bgColor="bg-blue-50"
                borderColor="border border-blue-200"
                dotColor="bg-blue-500"
                badgeColor="bg-blue-200 text-blue-700"
                selectedTasks={selectedTasks}
                onToggleSelect={handleToggleSelect}
                showSelection={showSelection}
              />

              <KanbanColumn
                title="Done"
                status="Completed"
                tasks={filteredTasks}
                count={filteredTasks.filter(task => task.status === 'Completed').length}
                draggedTask={draggedTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                bgColor="bg-green-50"
                borderColor="border border-green-200"
                dotColor="bg-green-500"
                badgeColor="bg-green-200 text-green-700"
                selectedTasks={selectedTasks}
                onToggleSelect={handleToggleSelect}
                showSelection={showSelection}
              />

              <KanbanColumn
                title="Blocked"
                status="Blocked"
                tasks={filteredTasks}
                count={filteredTasks.filter(task => task.status === 'Blocked').length}
                draggedTask={draggedTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                bgColor="bg-red-50"
                borderColor="border border-red-200"
                dotColor="bg-red-500"
                badgeColor="bg-red-200 text-red-700"
                selectedTasks={selectedTasks}
                onToggleSelect={handleToggleSelect}
                showSelection={showSelection}
              />
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>✨ Drag and drop tasks between columns to update their status</p>
            </div>
          </div>
        )}
        </div>

        <div id="analytics-panel" role="tabpanel" aria-labelledby="analytics-tab" hidden={activeTab !== 'analytics'}>
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Analytics & Progress</h2>
                  <p className="text-sm text-gray-500 mt-1">Track your project progress and performance metrics</p>
                </div>
                <div className="flex items-center gap-2">
                  <Select onValueChange={(value: ExportFormat) => {
                    if (value) {
                      handleExportProject(value)
                    }
                  }}>
                    <SelectTrigger className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200 focus:ring-gray-500">
                      <Download size={16} className="text-gray-500" />
                      <SelectValue placeholder="Export Project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">Export as JSON</SelectItem>
                      <SelectItem value="csv">Export as CSV</SelectItem>
                      <SelectItem value="template">Save as Template</SelectItem>
                    </SelectContent>
                  </Select>

                  <button
                    onClick={() => setShowImportModal(true)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 focus:ring-2 focus:ring-gray-500"
                    title="Import project template"
                  >
                    <Upload size={16} className="text-gray-500" />
                    Import Template
                  </button>

                  <Select onValueChange={(value: ExportFormat) => {
                    if (value) {
                      handleExportTasks(value)
                    }
                  }}>
                    <SelectTrigger className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200 focus:ring-gray-500">
                      <Download size={16} className="text-gray-500" />
                      <SelectValue placeholder="Export Tasks" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">Tasks as JSON</SelectItem>
                      <SelectItem value="csv">Tasks as CSV</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select onValueChange={(value: ExportFormat) => {
                    if (value) {
                      handleExportMilestones(value)
                    }
                  }}>
                    <SelectTrigger className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200 focus:ring-gray-500">
                      <Download size={16} className="text-gray-500" />
                      <SelectValue placeholder="Export Milestones" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">Milestones as JSON</SelectItem>
                      <SelectItem value="csv">Milestones as CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Search and Filter */}
              <div className="mb-6">
                <SearchAndFilter
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  priorityFilter={priorityFilter}
                  onPriorityFilterChange={setPriorityFilter}
                  categoryFilter={categoryFilter}
                  onCategoryFilterChange={setCategoryFilter}
                  availableCategories={availableCategories}
                  showFilters={showFilters}
                  onToggleFilters={() => setShowFilters(!showFilters)}
                  onClearFilters={handleClearFilters}
                  placeholder="Search tasks for analytics..."
                />
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <CheckCircle size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Tasks Completed</p>
                      <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Clock size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Hours Logged</p>
                      <p className="text-2xl font-bold text-gray-900">{completedHours}h</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Target size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Completion Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{safePercentage(filteredTasks.filter(task => task.status === 'Completed').length, filteredTasks.length)}%</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle size={20} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-red-600 font-medium">Blocked Tasks</p>
                      <p className="text-2xl font-bold text-red-900">{filteredTasks.filter(task => task.status === 'Blocked').length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Task Status Distribution */}
                <div className="bg-gray-50 rounded-lg p-6 border">
                  <h3 className="font-medium mb-4 text-gray-900">Task Status Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <span className="text-sm text-gray-600">Not Started</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-400 h-2 rounded-full" 
                            style={{ width: `${filteredTasks.length > 0 ? (filteredTasks.filter(t => t.status === 'Not Started').length / filteredTasks.length) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{filteredTasks.filter(t => t.status === 'Not Started').length}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-600">In Progress</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${filteredTasks.length > 0 ? (filteredTasks.filter(t => t.status === 'In Progress').length / filteredTasks.length) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{filteredTasks.filter(t => t.status === 'In Progress').length}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-600">Completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${filteredTasks.length > 0 ? (filteredTasks.filter(t => t.status === 'Completed').length / filteredTasks.length) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{filteredTasks.filter(t => t.status === 'Completed').length}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm text-gray-600">Blocked</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${filteredTasks.length > 0 ? (filteredTasks.filter(t => t.status === 'Blocked').length / filteredTasks.length) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{filteredTasks.filter(t => t.status === 'Blocked').length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Priority Distribution */}
                <div className="bg-gray-50 rounded-lg p-6 border">
                  <h3 className="font-medium mb-4 text-gray-900">Priority Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                        <span className="text-sm text-gray-600">High Priority</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-800 h-2 rounded-full" 
                            style={{ width: `${filteredTasks.length > 0 ? (filteredTasks.filter(t => t.priority === 'High').length / filteredTasks.length) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{filteredTasks.filter(t => t.priority === 'High').length}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                        <span className="text-sm text-gray-600">Medium Priority</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-600 h-2 rounded-full" 
                            style={{ width: `${filteredTasks.length > 0 ? (filteredTasks.filter(t => t.priority === 'Medium').length / filteredTasks.length) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{filteredTasks.filter(t => t.priority === 'Medium').length}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <span className="text-sm text-gray-600">Low Priority</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-400 h-2 rounded-full" 
                            style={{ width: `${filteredTasks.length > 0 ? (filteredTasks.filter(t => t.priority === 'Low').length / filteredTasks.length) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{filteredTasks.filter(t => t.priority === 'Low').length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Tracking & Burndown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Time Tracking */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-medium mb-4 text-gray-900">Time Tracking Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Estimated</span>
                    <span className="font-semibold text-gray-900">{totalHours}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Hours Logged</span>
                    <span className="font-semibold text-gray-900">{completedHours}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Remaining</span>
                    <span className="font-semibold text-gray-900">{(totalHours || 0) - (completedHours || 0)}h</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-900 font-medium">{safePercentage(completedHours, totalHours)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gray-800 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${safeWidth(completedHours, totalHours)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sprint Progress */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-medium mb-4 text-gray-900">Sprint Progress</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Sprint</span>
                    <span className="font-semibold text-gray-900">Week {projectData.currentSprint}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Sprint Goal</span>
                    <span className="font-semibold text-gray-900">
                      {milestones.find(m => m.status === 'In Progress')?.title || 
                       milestones.find(m => m.status === 'Not Started')?.title || 
                       'No Active Milestone'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Days Remaining</span>
                    <span className="font-semibold text-gray-900">{daysUntilLaunch || 0} days</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Sprint Progress</span>
                      <span className="text-gray-900 font-medium">{safePercentage(completedTasks, tasks.length)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gray-800 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${safeWidth(completedTasks, tasks.length)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Details Table */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-medium mb-4 text-gray-900">Task Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-medium text-gray-600">Task</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-600">Priority</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-600">Estimated</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-600">Actual</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-600">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2">
                          <div className="font-medium text-gray-900">{task.title}</div>
                        </td>
                        <td className="py-3 px-2">
                          <StatusBadge status={task.status} />
                        </td>
                        <td className="py-3 px-2">
                          <StatusBadge status={task.priority} />
                        </td>
                        <td className="py-3 px-2 text-gray-600">{task.estimatedHours}h</td>
                        <td className="py-3 px-2 text-gray-600">{task.actualHours}h</td>
                        <td className="py-3 px-2 text-gray-600">{new Date(task.dueDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        </div>

        <div id="timeline-panel" role="tabpanel" aria-labelledby="timeline-tab" hidden={activeTab !== 'timeline'}>
        {activeTab === 'timeline' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Project Timeline</h2>
              <button 
                onClick={handleAddMilestone}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
              >
                Add Milestone
              </button>
            </div>
            {milestones.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Calendar className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Milestones Yet</h3>
                <p className="text-gray-500 mb-4">Create milestones to track your project progress</p>
                <button 
                  onClick={handleAddMilestone}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
                >
                  Create First Milestone
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {milestones.map((milestone, index) => {
                  const getBorderColor = () => {
                    if (milestone.status === 'Completed') return 'border-green-500'
                    if (milestone.status === 'In Progress') return 'border-blue-500'
                    return 'border-gray-300'
                  }
                  
                  const getProgressColor = () => {
                    if (milestone.status === 'Completed') return 'bg-green-500'
                    if (milestone.status === 'In Progress') return 'bg-blue-500'
                    return 'bg-gray-300'
                  }

                  const getStatusBadgeStatus = () => {
                    if (milestone.status === 'Completed') return 'completed'
                    if (milestone.status === 'In Progress') return 'in-progress'
                    return 'upcoming'
                  }

                  const isOverdue = new Date(milestone.targetDate) < new Date() && milestone.status !== 'Completed'

                  return (
                    <div key={milestone.id} className={`border-l-4 ${getBorderColor()} pl-6 pb-6`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditMilestone(milestone)}
                            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
                            title="Edit milestone"
                          >
                            <Edit size={14} />
                          </button>
                          <StatusBadge status={getStatusBadgeStatus()} />
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        Due: {new Date(milestone.targetDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                        {isOverdue && <span className="text-red-500 ml-2 font-medium">• Overdue</span>}
                      </p>
                      {milestone.description && (
                        <p className="text-sm text-gray-600 mb-4">{milestone.description}</p>
                      )}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-900 font-medium">{milestone.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`} 
                            style={{ width: `${milestone.progress}%` }}
                          />
                        </div>
                      </div>
                      {/* Show related tasks for this milestone */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Related Tasks:</h4>
                        {tasks.filter(task => {
                          // For now, we'll show tasks that are due around the same time as the milestone
                          const taskDate = new Date(task.dueDate)
                          const milestoneDate = new Date(milestone.targetDate)
                          const daysDiff = Math.abs((taskDate.getTime() - milestoneDate.getTime()) / (1000 * 3600 * 24))
                          return daysDiff <= 7 // Tasks within 7 days of milestone
                        }).slice(0, 3).map(task => (
                          <div key={task.id} className="flex items-center justify-between py-1 text-sm">
                            <span className="text-gray-600">• {task.title}</span>
                            <StatusBadge status={task.status.toLowerCase().replace(' ', '-')} />
                          </div>
                        ))}
                        {tasks.filter(task => {
                          const taskDate = new Date(task.dueDate)
                          const milestoneDate = new Date(milestone.targetDate)
                          const daysDiff = Math.abs((taskDate.getTime() - milestoneDate.getTime()) / (1000 * 3600 * 24))
                          return daysDiff <= 7
                        }).length === 0 && (
                          <p className="text-sm text-gray-500">No related tasks found</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
        </div>
      </main>

      {/* Task Management Modal */}
      {showTaskModal && <TaskManagementModal />}
      
      {/* Edit Task Modal */}
      {showEditModal && <EditTaskModal />}
      
      {/* Add Task Modal */}
      {showAddModal && <AddTaskModal />}
      
      {/* Add Milestone Modal */}
      {showAddMilestoneModal && <AddMilestoneModal />}
      
      {/* Edit Milestone Modal */}
      {showEditMilestoneModal && <EditMilestoneModal />}
      
      {/* Project Setup Modal */}
      {showProjectSetup && <ProjectSetupModal />}
      
      {/* Reset Confirmation Modal */}
      {showResetConfirmation && <ResetConfirmationModal />}
      
      {/* Import Template Modals */}
      {showImportModal && !showTemplatePreview && <FileUploadModal />}
      {showTemplatePreview && <TemplatePreviewModal />}
      
      {/* Delete Task Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={handleCancelDeleteTask}
        onConfirm={handleConfirmDeleteTask}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeletingTask}
      />
      
      {/* Bulk Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showBulkDeleteConfirmation}
        onClose={handleCancelBulkDelete}
        onConfirm={handleConfirmBulkDelete}
        title="Delete Multiple Tasks"
        message={`Are you sure you want to delete ${selectedTasks.length} selected task${selectedTasks.length > 1 ? 's' : ''}? This action cannot be undone.`}
        confirmText="Delete All"
        cancelText="Cancel"
        variant="danger"
        isLoading={isBulkOperating}
      />
      
      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedTasks.length}
        onDeselectAll={handleDeselectAll}
        onBulkDelete={handleBulkDelete}
        onBulkStatusChange={handleBulkStatusChange}
        onBulkPriorityChange={handleBulkPriorityChange}
        isLoading={isBulkOperating}
      />
      </div>
    </div>
  )
} 