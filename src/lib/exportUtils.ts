// Export formats
export type ExportFormat = 'csv' | 'json'

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