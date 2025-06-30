// Export formats
export type ExportFormat = 'csv' | 'json' | 'template'

// Template export interfaces
export interface ProjectTemplate {
  version: string
  type: 'project_template'
  metadata: {
    name: string
    description: string
    author: string
    created_at: string
    category: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    estimated_duration_weeks: number
    tags: string[]
  }
  project: {
    name: string
    description: string
    total_sprints: number
    sprint_duration_weeks: number
  }
  milestones: TemplateMilestone[]
  tasks: TemplateTask[]
  ai_context: {
    project_type: string
    target_audience: string
    tech_stack: string[]
    team_size: number
    budget_range: string
    complexity_level: string
  }
}

export interface TemplateMilestone {
  title: string
  description: string
  target_date_offset_days: number
  status: string
  progress: number
  category: string
  priority: string
}

export interface TemplateTask {
  title: string
  description: string
  category: string
  priority: string
  status: string
  estimated_hours: number
  actual_hours: number
  due_date_offset_days: number
  sprint_week: number
  milestone_reference?: string
  dependencies: string[]
  tags: string[]
}

// Helper function to convert data to CSV
export function convertToCSV(data: any[], headers: string[]): string {
  const csvHeaders = headers.join(',')
  const csvRows = data.map(row => 
    headers.map(header => {
      const value = row[header]
      // Handle special characters and quotes in CSV
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value || ''
    }).join(',')
  )
  
  return [csvHeaders, ...csvRows].join('\n')
}

// Helper function to calculate relative date offset from project start
export function calculateDateOffset(projectStartDate: string, targetDate: string): number {
  const startDate = new Date(projectStartDate)
  const endDate = new Date(targetDate)
  const diffTime = endDate.getTime() - startDate.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays) // Ensure non-negative offset
}

// Helper function to infer project type from tasks/milestones
export function inferProjectType(tasks: any[], milestones: any[]): string {
  const allText = [
    ...tasks.map(t => `${t.title} ${t.description || ''} ${t.category}`),
    ...milestones.map(m => `${m.title} ${m.description || ''}`)
  ].join(' ').toLowerCase()

  if (allText.includes('saas') || allText.includes('subscription') || allText.includes('api')) return 'saas_web_application'
  if (allText.includes('ecommerce') || allText.includes('shop') || allText.includes('payment')) return 'ecommerce_platform'
  if (allText.includes('mobile') || allText.includes('app store') || allText.includes('ios') || allText.includes('android')) return 'mobile_application'
  if (allText.includes('blog') || allText.includes('content') || allText.includes('cms')) return 'content_platform'
  if (allText.includes('game') || allText.includes('unity') || allText.includes('gaming')) return 'game_development'
  
  return 'web_application' // Default fallback
}

// Helper function to infer tech stack from tasks
export function inferTechStack(tasks: any[]): string[] {
  const allText = tasks.map(t => `${t.title} ${t.description || ''}`).join(' ').toLowerCase()
  const techStack: string[] = []

  // Frontend frameworks
  if (allText.includes('react')) techStack.push('react')
  if (allText.includes('vue')) techStack.push('vue')
  if (allText.includes('angular')) techStack.push('angular')
  if (allText.includes('next')) techStack.push('nextjs')

  // Backend frameworks
  if (allText.includes('node')) techStack.push('nodejs')
  if (allText.includes('python') || allText.includes('django') || allText.includes('flask')) techStack.push('python')
  if (allText.includes('rails') || allText.includes('ruby')) techStack.push('ruby')
  if (allText.includes('laravel') || allText.includes('php')) techStack.push('php')

  // Databases
  if (allText.includes('postgres') || allText.includes('postgresql')) techStack.push('postgresql')
  if (allText.includes('mysql')) techStack.push('mysql')
  if (allText.includes('mongo')) techStack.push('mongodb')
  if (allText.includes('redis')) techStack.push('redis')

  return techStack.length > 0 ? techStack : ['javascript', 'html', 'css'] // Default stack
}

// Helper function to download a file
export function downloadFile(content: string, filename: string, mimeType: string): void {
  try {
    console.log('Creating download:', { filename, mimeType, contentLength: content.length })
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    console.log('Download initiated successfully')
  } catch (error) {
    console.error('Error creating download:', error)
    throw error
  }
}

// Export tasks data
export function exportTasks(tasks: any[], exportFormat: ExportFormat, projectName: string = 'Project'): void {
  console.log('exportTasks called with:', { tasksCount: tasks.length, exportFormat, projectName })
  
  if (!tasks || tasks.length === 0) {
    console.warn('No tasks to export')
    alert('No tasks available to export')
    return
  }
  
  const timestamp = new Date().toISOString().slice(0, 16).replace(/:/g, '-')
  const filename = `${projectName.replace(/[^a-zA-Z0-9]/g, '_')}_tasks_${timestamp}`
  
  // Prepare task data for export
  const exportData = tasks.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description || '',
    category: task.category,
    status: task.status,
    priority: task.priority,
    estimated_hours: task.estimatedHours || 0,
    actual_hours: task.actualHours || 0,
    due_date: task.dueDate || '',
    created_at: task.createdAt || '',
    completion_percentage: task.status === 'Completed' ? 100 : 
                          task.status === 'In Progress' ? 50 : 0
  }))

  switch (exportFormat) {
    case 'csv':
      const headers = [
        'id', 'title', 'description', 'category', 'status', 'priority',
        'estimated_hours', 'actual_hours', 'due_date', 'created_at', 'completion_percentage'
      ]
      const csvContent = convertToCSV(exportData, headers)
      downloadFile(csvContent, `${filename}.csv`, 'text/csv')
      break

    case 'json':
      const jsonContent = JSON.stringify({
        project: projectName,
        exported_at: new Date().toISOString(),
        total_tasks: tasks.length,
        tasks: exportData
      }, null, 2)
      downloadFile(jsonContent, `${filename}.json`, 'application/json')
      break
  }
}

// Export milestones data
export function exportMilestones(milestones: any[], exportFormat: ExportFormat, projectName: string = 'Project'): void {
  console.log('exportMilestones called with:', { milestonesCount: milestones.length, exportFormat, projectName })
  
  if (!milestones || milestones.length === 0) {
    console.warn('No milestones to export')
    alert('No milestones available to export')
    return
  }
  
  const timestamp = new Date().toISOString().slice(0, 16).replace(/:/g, '-')
  const filename = `${projectName.replace(/[^a-zA-Z0-9]/g, '_')}_milestones_${timestamp}`
  
  const exportData = milestones.map(milestone => ({
    id: milestone.id,
    title: milestone.title,
    description: milestone.description || '',
    status: milestone.status,
    progress: milestone.progress || 0,
    target_date: milestone.targetDate || '',
    created_at: milestone.createdAt || ''
  }))

  switch (exportFormat) {
    case 'csv':
      const headers = ['id', 'title', 'description', 'status', 'progress', 'target_date', 'created_at']
      const csvContent = convertToCSV(exportData, headers)
      downloadFile(csvContent, `${filename}.csv`, 'text/csv')
      break

    case 'json':
      const jsonContent = JSON.stringify({
        project: projectName,
        exported_at: new Date().toISOString(),
        total_milestones: milestones.length,
        milestones: exportData
      }, null, 2)
      downloadFile(jsonContent, `${filename}.json`, 'application/json')
      break
  }
}

// Export complete project data
export function exportProject(
  projectData: any, 
  tasks: any[], 
  milestones: any[], 
  exportFormat: ExportFormat
): void {
  console.log('exportProject called with:', { 
    projectName: projectData.projectName, 
    tasksCount: tasks.length, 
    milestonesCount: milestones.length, 
    exportFormat 
  })
  
  const timestamp = new Date().toISOString().slice(0, 16).replace(/:/g, '-')
  const projectName = projectData.projectName || 'Project'
  const filename = `${projectName.replace(/[^a-zA-Z0-9]/g, '_')}_complete_${timestamp}`
  
  const completeData = {
    project: {
      name: projectData.projectName,
      description: projectData.description,
      start_date: projectData.startDate,
      target_launch_date: projectData.targetLaunchDate,
      current_sprint: projectData.currentSprint,
      total_sprints: projectData.totalSprints
    },
    summary: {
      total_tasks: tasks.length,
      completed_tasks: tasks.filter(t => t.status === 'Completed').length,
      total_milestones: milestones.length,
      completed_milestones: milestones.filter(m => m.status === 'Completed').length,
      total_estimated_hours: tasks.reduce((sum, t) => sum + (t.estimatedHours || 0), 0),
      total_actual_hours: tasks.reduce((sum, t) => sum + (t.actualHours || 0), 0)
    },
    tasks: tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description || '',
      category: task.category,
      status: task.status,
      priority: task.priority,
      estimated_hours: task.estimatedHours || 0,
      actual_hours: task.actualHours || 0,
      due_date: task.dueDate || '',
      created_at: task.createdAt || ''
    })),
    milestones: milestones.map(milestone => ({
      id: milestone.id,
      title: milestone.title,
      description: milestone.description || '',
      status: milestone.status,
      progress: milestone.progress || 0,
      target_date: milestone.targetDate || '',
      created_at: milestone.createdAt || ''
    })),
    exported_at: new Date().toISOString()
  }

  switch (exportFormat) {
    case 'json':
      const jsonContent = JSON.stringify(completeData, null, 2)
      downloadFile(jsonContent, `${filename}.json`, 'application/json')
      break

    case 'template':
      // Use the dedicated template export function
      exportProjectTemplate(projectData, tasks, milestones)
      return // Early return since template export handles its own download

    case 'csv':
      // For CSV, export tasks and milestones separately in a combined format
      const tasksCSV = convertToCSV(completeData.tasks, [
        'id', 'title', 'description', 'category', 'status', 'priority',
        'estimated_hours', 'actual_hours', 'due_date', 'created_at'
      ])
      const milestonesCSV = convertToCSV(completeData.milestones, [
        'id', 'title', 'description', 'status', 'progress', 'target_date', 'created_at'
      ])
      const combinedCSV = `PROJECT SUMMARY\n${JSON.stringify(completeData.summary, null, 2)}\n\nTASKS\n${tasksCSV}\n\nMILESTONES\n${milestonesCSV}`
      downloadFile(combinedCSV, `${filename}.csv`, 'text/csv')
      break
  }
}

// Export project as reusable template
export function exportProjectTemplate(
  projectData: any,
  tasks: any[],
  milestones: any[],
  author: string = 'anonymous'
): void {
  console.log('exportProjectTemplate called with:', {
    projectName: projectData.projectName,
    tasksCount: tasks.length,
    milestonesCount: milestones.length,
    author
  })

  const timestamp = new Date().toISOString().slice(0, 16).replace(/:/g, '-')
  const projectName = projectData.projectName || 'Project'
  const filename = `${projectName.replace(/[^a-zA-Z0-9]/g, '_')}_template_${timestamp}`

  // Calculate project duration in weeks
  const startDate = new Date(projectData.startDate)
  const endDate = new Date(projectData.targetLaunchDate)
  const durationMs = endDate.getTime() - startDate.getTime()
  const durationWeeks = Math.ceil(durationMs / (1000 * 60 * 60 * 24 * 7))

  // Infer project characteristics for AI context
  const projectType = inferProjectType(tasks, milestones)
  const techStack = inferTechStack(tasks)

  // Convert milestones to template format with relative dates
  const templateMilestones: TemplateMilestone[] = milestones.map(milestone => ({
    title: milestone.title,
    description: milestone.description || '',
    target_date_offset_days: calculateDateOffset(projectData.startDate, milestone.targetDate),
    status: 'Not Started', // Reset status for template
    progress: 0, // Reset progress for template
    category: 'milestone',
    priority: milestone.progress > 50 ? 'high' : milestone.progress > 0 ? 'medium' : 'low'
  }))

  // Convert tasks to template format with relative dates
  const templateTasks: TemplateTask[] = tasks.map(task => ({
    title: task.title,
    description: task.description || '',
    category: task.category,
    priority: task.priority,
    status: 'Not Started', // Reset status for template
    estimated_hours: task.estimatedHours || 0,
    actual_hours: 0, // Reset actual hours for template
    due_date_offset_days: calculateDateOffset(projectData.startDate, task.dueDate),
    sprint_week: task.sprintWeek || 1,
    dependencies: [], // TODO: Add dependency detection in future
    tags: [task.category.toLowerCase()] // Use category as default tag
  }))

  // Create difficulty assessment based on total hours and task complexity
  const totalHours = tasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0)
  const difficulty: 'beginner' | 'intermediate' | 'advanced' = 
    totalHours < 40 ? 'beginner' :
    totalHours < 120 ? 'intermediate' : 'advanced'

  // Generate template tags based on content
  const templateTags = [
    ...new Set([
      projectType.split('_')[0], // e.g., 'saas', 'ecommerce'
      ...techStack,
      ...(tasks.map(t => t.category.toLowerCase())),
      difficulty
    ])
  ].slice(0, 8) // Limit to 8 tags

  const template: ProjectTemplate = {
    version: '2.0',
    type: 'project_template',
    metadata: {
      name: `${projectName} Template`,
      description: projectData.description || `A ${difficulty} level ${projectType.replace('_', ' ')} project template with ${tasks.length} tasks and ${milestones.length} milestones.`,
      author,
      created_at: new Date().toISOString(),
      category: projectType,
      difficulty,
      estimated_duration_weeks: durationWeeks,
      tags: templateTags
    },
    project: {
      name: projectName,
      description: projectData.description || '',
      total_sprints: projectData.totalSprints || 16,
      sprint_duration_weeks: 1
    },
    milestones: templateMilestones,
    tasks: templateTasks,
    ai_context: {
      project_type: projectType,
      target_audience: totalHours < 40 ? 'individual_creator' : totalHours < 120 ? 'small_business' : 'enterprise',
      tech_stack: techStack,
      team_size: 1, // Default for solo founder
      budget_range: difficulty === 'beginner' ? 'bootstrap' : difficulty === 'intermediate' ? 'seed' : 'series_a',
      complexity_level: difficulty
    }
  }

  const jsonContent = JSON.stringify(template, null, 2)
  downloadFile(jsonContent, `${filename}.json`, 'application/json')

  console.log('Template export completed:', {
    filename: `${filename}.json`,
    templateSize: jsonContent.length,
    inferredType: projectType,
    inferredTechStack: techStack,
    difficulty,
    durationWeeks
  })
}