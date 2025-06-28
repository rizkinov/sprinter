import { createSupabaseClient, Database } from './supabase'

type Tables = Database['public']['Tables']
type Project = Tables['projects']['Row']
type Task = Tables['tasks']['Row']
type Milestone = Tables['milestones']['Row']
type TaskInsert = Tables['tasks']['Insert']
type TaskUpdate = Tables['tasks']['Update']
type ProjectInsert = Tables['projects']['Insert']
type MilestoneInsert = Tables['milestones']['Insert']

export class DatabaseService {
  private supabase = createSupabaseClient()

  // Project operations
  async getProjects(userId: string): Promise<Project[]> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      throw error
    }

    return data || []
  }

  async getProject(projectId: string, userId: string): Promise<Project | null> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error fetching project:', error)
      return null
    }

    return data
  }

  async createProject(project: ProjectInsert): Promise<Project | null> {
    const { data, error } = await this.supabase
      .from('projects')
      .insert(project)
      .select()
      .single()

    if (error) {
      console.error('Error creating project:', error)
      throw error
    }

    return data
  }

  async updateProject(projectId: string, updates: Partial<ProjectInsert>): Promise<Project | null> {
    const { data, error } = await this.supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', projectId)
      .select()
      .single()

    if (error) {
      console.error('Error updating project:', error)
      throw error
    }

    return data
  }

  // Task operations
  async getTasks(projectId: string, userId: string): Promise<Task[]> {
    const { data, error } = await this.supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .eq('user_id', userId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching tasks:', error)
      throw error
    }

    return data || []
  }

  async getTask(taskId: string, userId: string): Promise<Task | null> {
    const { data, error } = await this.supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error fetching task:', error)
      return null
    }

    return data
  }

  async createTask(task: TaskInsert): Promise<Task | null> {
    const { data, error } = await this.supabase
      .from('tasks')
      .insert(task)
      .select()
      .single()

    if (error) {
      console.error('Error creating task:', error)
      throw error
    }

    return data
  }

  async updateTask(taskId: string, updates: TaskUpdate): Promise<Task | null> {
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    }

    // If status is being changed to 'Completed', set completed_at
    if (updates.status === 'Completed') {
      updateData.completed_at = new Date().toISOString()
    } else if (updates.status) {
      updateData.completed_at = null
    }

    const { data, error } = await this.supabase
      .from('tasks')
      .update(updateData)
      .eq('id', taskId)
      .select()
      .single()

    if (error) {
      console.error('Error updating task:', error)
      throw error
    }

    return data
  }

  async deleteTask(taskId: string, userId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .eq('user_id', userId)

    if (error) {
      console.error('Error deleting task:', error)
      throw error
    }

    return true
  }

  // Milestone operations
  async getMilestones(projectId: string, userId: string): Promise<Milestone[]> {
    const { data, error } = await this.supabase
      .from('milestones')
      .select('*')
      .eq('project_id', projectId)
      .eq('user_id', userId)
      .order('target_date', { ascending: true })

    if (error) {
      console.error('Error fetching milestones:', error)
      throw error
    }

    return data || []
  }

  async createMilestone(milestone: MilestoneInsert): Promise<Milestone | null> {
    const { data, error } = await this.supabase
      .from('milestones')
      .insert(milestone)
      .select()
      .single()

    if (error) {
      console.error('Error creating milestone:', error)
      throw error
    }

    return data
  }

  async updateMilestone(milestoneId: string, updates: Partial<MilestoneInsert>): Promise<Milestone | null> {
    const { data, error } = await this.supabase
      .from('milestones')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', milestoneId)
      .select()
      .single()

    if (error) {
      console.error('Error updating milestone:', error)
      throw error
    }

    return data
  }

  // Analytics operations
  async getTaskAnalytics(projectId: string, userId: string) {
    const tasks = await this.getTasks(projectId, userId)
    
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.status === 'Completed').length
    const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length
    const blockedTasks = tasks.filter(task => task.status === 'Blocked').length
    const notStartedTasks = tasks.filter(task => task.status === 'Not Started').length

    const totalEstimatedHours = tasks.reduce((sum, task) => sum + task.estimated_hours, 0)
    const totalActualHours = tasks.reduce((sum, task) => sum + task.actual_hours, 0)
    const completedHours = tasks
      .filter(task => task.status === 'Completed')
      .reduce((sum, task) => sum + task.actual_hours, 0)

    const highPriorityTasks = tasks.filter(task => task.priority === 'High').length
    const mediumPriorityTasks = tasks.filter(task => task.priority === 'Medium').length
    const lowPriorityTasks = tasks.filter(task => task.priority === 'Low').length

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      blockedTasks,
      notStartedTasks,
      totalEstimatedHours,
      totalActualHours,
      completedHours,
      highPriorityTasks,
      mediumPriorityTasks,
      lowPriorityTasks,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      timeProgress: totalEstimatedHours > 0 ? (totalActualHours / totalEstimatedHours) * 100 : 0
    }
  }

  // Delete all user data (for reset functionality)
  async resetAllUserData(userId: string) {
    try {
      // Delete all user's tasks first (due to foreign key constraints)
      const { error: tasksError } = await this.supabase
        .from('tasks')
        .delete()
        .eq('user_id', userId)

      if (tasksError) throw tasksError

      // Delete all user's milestones
      const { error: milestonesError } = await this.supabase
        .from('milestones')
        .delete()
        .eq('user_id', userId)

      if (milestonesError) throw milestonesError

      // Delete all user's projects
      const { error: projectsError } = await this.supabase
        .from('projects')
        .delete()
        .eq('user_id', userId)

      if (projectsError) throw projectsError

      return true
    } catch (error) {
      console.error('Error resetting user data:', error)
      throw error
    }
  }
}

// Export a singleton instance
export const db = new DatabaseService() 