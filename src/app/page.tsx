'use client'

import React, { useState, useEffect } from 'react'
import { 
  BarChart3, 
  Kanban, 
  TrendingUp, 
  Calendar as CalendarIcon,
  Download,
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
  X
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
  
  const completedTasks = tasks.filter(task => task.status === 'Completed').length
  const totalHours = tasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0)
  const completedHours = tasks.filter(task => task.status === 'Completed').reduce((sum, task) => sum + (task.actualHours || 0), 0)
  
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
    try {
      // Load user's projects
      const projects = await db.getProjects(userId)
      
      if (projects.length > 0) {
        const project = projects[0] // Use first project for now
        setCurrentProject(project)
        setProjectData({
          projectName: project.name,
          startDate: project.start_date,
          targetLaunchDate: project.target_launch_date,
          description: project.description || '',
          currentSprint: project.current_sprint,
          totalSprints: project.total_sprints
        })

        // Load tasks and milestones
        const [userTasks, userMilestones] = await Promise.all([
          db.getTasks(project.id, userId),
          db.getMilestones(project.id, userId)
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
    }
  }

  const createNewProject = async (projectInfo: any) => {
    if (!user) return

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
        setCurrentProject(project)
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
              tasks: []
            }])
          }
        }
      }
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  const createNewTask = async (taskInfo: any) => {
    if (!user || !currentProject) return

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
    }
  }

  const updateTaskInDb = async (taskId: string, updates: any) => {
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
  }

  const deleteTaskFromDb = async (taskId: string) => {
    if (!user) return

    try {
      await db.deleteTask(taskId, user.id)
      setTasks(prev => prev.filter(task => task.id !== taskId))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      // The useAuth hook will automatically handle state updates
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  
  const handleEditTask = (task: any) => {
    setEditingTask(task)
    setShowEditModal(true)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setEditingTask(null)
  }

  const handleAddTask = () => {
    setShowAddModal(true)
  }

  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }

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
      setCurrentProject(prev => ({ ...prev, name: newName.trim() }))
      setEditingProjectName(false)
    } catch (error) {
      console.error('Error updating project name:', error)
    }
  }

  const handleDragStart = (e: React.DragEvent, task: any) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e: React.DragEvent, newStatus: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked') => {
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
  }

  const handleDragEnd = () => {
    setDraggedTask(null)
  }

  // DatePicker component
  const DatePicker = ({ value, onChange, placeholder = "Pick a date", name }: any) => {
    const [open, setOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      value ? new Date(value) : undefined
    )

    const handleDateSelect = (date: Date | undefined) => {
      setSelectedDate(date)
      if (onChange) {
        onChange(date ? format(date, 'yyyy-MM-dd') : '')
      }
      setOpen(false)
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, 'PPP') : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
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

  const TabButton = ({ id, label, icon: Icon, active, onClick }: any) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
        active 
          ? 'text-gray-900 border-gray-900' 
          : 'text-gray-500 hover:text-gray-700 border-transparent'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  )

  const ProgressBar = ({ value, max, className = '' }: any) => {
    const safeValue = value || 0
    const safeMax = max || 1
    const percentage = Math.min(100, (safeValue / safeMax) * 100)
    
    return (
      <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }

  const StatusBadge = ({ status, className = '' }: any) => {
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
    if (!editingTask) return null

    const [editFormData, setEditFormData] = useState({
      title: editingTask.title || '',
      category: editingTask.category || 'Development',
      status: editingTask.status || 'Not Started',
      priority: editingTask.priority || 'Medium',
      estimatedHours: editingTask.estimatedHours || 0,
      actualHours: editingTask.actualHours || 0,
      notes: editingTask.notes || ''
    })

    const handleUpdateTask = async () => {
      if (!editingTask.id) return

      try {
        await updateTaskInDb(editingTask.id, {
          title: editFormData.title,
          category: editFormData.category,
          status: editFormData.status,
          priority: editFormData.priority,
          estimated_hours: editFormData.estimatedHours,
          actual_hours: editFormData.actualHours
        })

        // Update local state
        setTasks(prev => prev.map(task => 
          task.id === editingTask.id 
            ? { ...task, ...editFormData, estimatedHours: editFormData.estimatedHours, actualHours: editFormData.actualHours }
            : task
        ))

        handleCloseEditModal()
      } catch (error) {
        console.error('Error updating task:', error)
      }
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                      <SelectItem value="Documentation">Documentation</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
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
          tasks: []
        }
        setMilestones(prev => [...prev, newMilestone])
      }
    } catch (error) {
      console.error('Error creating milestone:', error)
    }
  }

  const EditMilestoneModal = () => {
    if (!editingMilestone) return null

    const [editFormData, setEditFormData] = useState({
      title: editingMilestone.title || '',
      description: editingMilestone.description || '',
      targetDate: editingMilestone.targetDate || ''
    })

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
                progress: calculatedProgress
              }
            : milestone
        ))

        handleCloseEditMilestoneModal()
      } catch (error) {
        console.error('Error updating milestone:', error)
      }
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                  onChange={(date) => setEditFormData(prev => ({ ...prev, targetDate: date ? date.toISOString().split('T')[0] : '' }))}
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
    if (!showAddMilestoneModal) return null

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)
      
      const milestoneInfo = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        targetDate: formData.get('targetDate') as string
      }

      await createNewMilestone(milestoneInfo)
      setShowAddMilestoneModal(false)
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
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
    if (!showProjectSetup) return null

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)
      
      const projectInfo = {
        name: formData.get('projectName') as string,
        description: formData.get('description') as string,
        startDate: formData.get('startDate') as string,
        targetLaunchDate: formData.get('targetLaunchDate') as string,
        totalSprints: parseInt(formData.get('totalSprints') as string) || 16,
        milestoneTitle: formData.get('milestoneTitle') as string,
        milestoneDescription: formData.get('milestoneDescription') as string,
        milestoneTargetDate: formData.get('milestoneTargetDate') as string
      }

      await createNewProject(projectInfo)
      setShowProjectSetup(false)
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Target Launch Date *</label>
                <DatePicker
                  name="targetLaunchDate"
                  placeholder="Select launch date"
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
        dueDate: formData.get('dueDate') as string,
        sprintWeek: parseInt(formData.get('sprintWeek') as string) || 1
      }

      if (!taskInfo.title || !taskInfo.dueDate) {
        alert('Please fill in all required fields')
        return
      }

      await createNewTask(taskInfo)
      setShowAddModal(false)
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                      <SelectItem value="Documentation">Documentation</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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

                  {/* Code Icon */}
                  <div className="flex items-center pt-1">
                    <Code size={16} className="text-gray-400" />
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
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
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

  const ResetConfirmationModal = () => {
    if (!showResetConfirmation) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
          <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
                <button className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 transition-colors">
                  <Download size={14} />
                  Export
                </button>
                <button 
                  onClick={() => setShowTaskModal(true)}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Plus size={14} />
                  New task
                </button>
                <button 
                  onClick={handleResetData}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded text-sm font-medium transition-colors"
                >
                  Reset
                </button>
                <button 
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded text-sm font-medium transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0 -mb-px">
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
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
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
                  <button
                    onClick={handleCreateProject}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto"
                  >
                    <Plus size={18} />
                    Create Your First Project
                  </button>
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
                        <Code size={14} className="text-gray-400" />
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
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">This Week's Priority</h3>
                  <p className="text-sm text-gray-600">
                    {milestones.length > 0 
                      ? milestones[0].title
                      : 'No active milestone - add one to get started!'
                    }
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Key Success Metrics</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Complete {Math.max(1, Math.floor(tasks.length * 0.8))} out of {tasks.length} tasks</li>
                    <li>• Stay within {totalHours}h time budget</li>
                    <li>• Resolve any blockers quickly</li>
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

                    // Get category icon
                    const getCategoryIcon = (category: string) => {
                      switch (category) {
                        case 'Development': return Code
                        case 'Design': return Target
                        case 'Testing': return CheckCircle
                        case 'Documentation': return Edit
                        case 'Marketing': return TrendingUp
                        case 'Research': return BarChart3
                        default: return Activity
                      }
                    }

                                         return Object.entries(categoryGroups).length > 0 ? (
                       Object.entries(categoryGroups).map(([category, data]) => {
                         const categoryData = data as { total: number; completed: number }
                         const Icon = getCategoryIcon(category)
                         const completionPercentage = safePercentage(categoryData.completed, categoryData.total)
                        
                        return (
                          <div key={category} className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <Icon size={14} className="text-gray-600" />
                              <span className="text-sm text-gray-600">{category}</span>
                            </div>
                            <div className="flex-1">
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                 className="bg-gray-800 h-2 rounded-full" 
                                 style={{ width: `${safeWidth(categoryData.completed, categoryData.total)}%` }}
                               ></div>
                             </div>
                           </div>
                           <span className="text-sm text-gray-500">{categoryData.completed}/{categoryData.total}</span>
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
                      <button
                        onClick={handleAddMilestone}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 mx-auto"
                      >
                        <Plus size={16} />
                        Add Milestone
                      </button>
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
                <p className="text-sm text-gray-500">Complete your first task to see achievements here!</p>
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
                    <button 
                      onClick={handleAddTask}
                      className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-2 text-gray-700"
                    >
                      <Plus size={14} />
                      Add Task
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-2 text-gray-700">
                      <Kanban size={14} />
                      View Kanban
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-2 text-gray-700">
                      <Download size={14} />
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )}
          </>
        )}

        {activeTab === 'kanban' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Kanban Board</h2>
              <button 
                onClick={() => setShowTaskModal(true)}
                className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
              >
                <Plus size={16} />
                Add Task
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* To Do Column */}
              <div 
                className="bg-gray-50 rounded-lg p-4 border min-h-[400px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'Not Started')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    To Do
                  </h3>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                    {tasks.filter(task => task.status === 'Not Started').length}
                  </span>
                </div>
                <div className="space-y-3">
                  {tasks.filter(task => task.status === 'Not Started').map((task) => (
                    <div 
                      key={task.id} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                      className={`bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all cursor-move ${
                        draggedTask?.id === task.id ? 'opacity-50 rotate-2' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Code size={14} className="text-gray-500" />
                        </div>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => handleEditTask(task)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Edit size={12} className="text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Trash2 size={12} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-medium text-sm mb-3 text-gray-900 leading-tight">{task.title}</h4>
                      <div className="flex items-center justify-between mb-3">
                        <StatusBadge status={task.priority.toLowerCase()} />
                        <span className="text-xs text-gray-500">0h / {task.estimatedHours}h</span>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium border border-gray-300">
                          {task.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div 
                className="bg-blue-50 rounded-lg p-4 border border-blue-200 min-h-[400px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'In Progress')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    In Progress
                  </h3>
                  <span className="bg-blue-200 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                    {tasks.filter(task => task.status === 'In Progress').length}
                  </span>
                </div>
                <div className="space-y-3">
                  {tasks.filter(task => task.status === 'In Progress').length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-sm text-gray-500">No tasks in progress</p>
                    </div>
                                        ) : (
                    tasks.filter(task => task.status === 'In Progress').map((task) => (
                      <div 
                        key={task.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        onDragEnd={handleDragEnd}
                        className={`bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all cursor-move ${
                          draggedTask?.id === task.id ? 'opacity-50 rotate-2' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Code size={14} className="text-gray-500" />
                          </div>
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => handleEditTask(task)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Edit size={12} className="text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Trash2 size={12} className="text-gray-400" />
                            </button>
                          </div>
                        </div>
                        <h4 className="font-medium text-sm mb-3 text-gray-900 leading-tight">{task.title}</h4>
                        <div className="flex items-center justify-between mb-3">
                          <StatusBadge status={task.priority.toLowerCase()} />
                          <span className="text-xs text-gray-500">0h / {task.estimatedHours}h</span>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium border border-gray-300">
                            {task.category}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Done Column */}
              <div 
                className="bg-green-50 rounded-lg p-4 border border-green-200 min-h-[400px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'Completed')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Done
                  </h3>
                  <span className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                    {tasks.filter(task => task.status === 'Completed').length}
                  </span>
                </div>
                <div className="space-y-3">
                  {tasks.filter(task => task.status === 'Completed').length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-sm text-gray-500">No tasks completed</p>
                    </div>
                  ) : (
                    tasks.filter(task => task.status === 'Completed').map((task) => (
                      <div 
                        key={task.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        onDragEnd={handleDragEnd}
                        className={`bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all cursor-move ${
                          draggedTask?.id === task.id ? 'opacity-50 rotate-2' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Code size={14} className="text-gray-500" />
                          </div>
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => handleEditTask(task)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Edit size={12} className="text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Trash2 size={12} className="text-gray-400" />
                            </button>
                          </div>
                        </div>
                        <h4 className="font-medium text-sm mb-3 text-gray-900 leading-tight">{task.title}</h4>
                        <div className="flex items-center justify-between mb-3">
                          <StatusBadge status={task.priority.toLowerCase()} />
                          <span className="text-xs text-gray-500">0h / {task.estimatedHours}h</span>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium border border-gray-300">
                            {task.category}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Blocked Column */}
              <div 
                className="bg-red-50 rounded-lg p-4 border border-red-200 min-h-[400px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'Blocked')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    Blocked
                  </h3>
                  <span className="bg-red-200 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                    {tasks.filter(task => task.status === 'Blocked').length}
                  </span>
                </div>
                <div className="space-y-3">
                  {tasks.filter(task => task.status === 'Blocked').length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-sm text-gray-500">No blocked tasks</p>
                    </div>
                  ) : (
                    tasks.filter(task => task.status === 'Blocked').map((task) => (
                      <div 
                        key={task.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        onDragEnd={handleDragEnd}
                        className={`bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all cursor-move ${
                          draggedTask?.id === task.id ? 'opacity-50 rotate-2' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Code size={14} className="text-gray-500" />
                          </div>
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => handleEditTask(task)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Edit size={12} className="text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Trash2 size={12} className="text-gray-400" />
                            </button>
                          </div>
                        </div>
                        <h4 className="font-medium text-sm mb-3 text-gray-900 leading-tight">{task.title}</h4>
                        <div className="flex items-center justify-between mb-3">
                          <StatusBadge status={task.priority.toLowerCase()} />
                          <span className="text-xs text-gray-500">0h / {task.estimatedHours}h</span>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium border border-gray-300">
                            {task.category}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>✨ Drag and drop tasks between columns to update their status</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Analytics & Progress</h2>
                  <p className="text-sm text-gray-500 mt-1">Track your project progress and performance metrics</p>
                </div>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                  <Download size={16} />
                  Export Charts
                </button>
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
                      <p className="text-2xl font-bold text-gray-900">{safePercentage(completedTasks, tasks.length)}%</p>
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
                      <p className="text-2xl font-bold text-red-900">{tasks.filter(task => task.status === 'Blocked').length}</p>
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
                            style={{ width: `${(tasks.filter(t => t.status === 'Not Started').length / tasks.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{tasks.filter(t => t.status === 'Not Started').length}</span>
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
                            style={{ width: `${(tasks.filter(t => t.status === 'In Progress').length / tasks.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{tasks.filter(t => t.status === 'In Progress').length}</span>
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
                            style={{ width: `${(tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{tasks.filter(t => t.status === 'Completed').length}</span>
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
                            style={{ width: `${(tasks.filter(t => t.status === 'Blocked').length / tasks.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{tasks.filter(t => t.status === 'Blocked').length}</span>
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
                            style={{ width: `${(tasks.filter(t => t.priority === 'High').length / tasks.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{tasks.filter(t => t.priority === 'High').length}</span>
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
                            style={{ width: `${(tasks.filter(t => t.priority === 'Medium').length / tasks.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{tasks.filter(t => t.priority === 'Medium').length}</span>
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
                            style={{ width: `${(tasks.filter(t => t.priority === 'Low').length / tasks.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{tasks.filter(t => t.priority === 'Low').length}</span>
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
                    {tasks.map((task) => (
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
    </div>
  )
} 