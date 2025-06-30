import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

// Types for our database schema
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          start_date: string
          target_launch_date: string
          current_sprint: number
          total_sprints: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          start_date: string
          target_launch_date: string
          current_sprint?: number
          total_sprints?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          start_date?: string
          target_launch_date?: string
          current_sprint?: number
          total_sprints?: number
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          project_id: string
          user_id: string
          title: string
          description: string | null
          category: string
          priority: 'Low' | 'Medium' | 'High'
          status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked'
          estimated_hours: number
          actual_hours: number
          due_date: string
          sprint_week: number
          created_at: string
          updated_at: string
          completed_at: string | null
          in_progress_started_at: string | null
          in_progress_total_seconds: number
          last_status_change_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          title: string
          description?: string | null
          category: string
          priority: 'Low' | 'Medium' | 'High'
          status?: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked'
          estimated_hours: number
          actual_hours?: number
          due_date: string
          sprint_week: number
          created_at?: string
          updated_at?: string
          completed_at?: string | null
          in_progress_started_at?: string | null
          in_progress_total_seconds?: number
          last_status_change_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: string
          priority?: 'Low' | 'Medium' | 'High'
          status?: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked'
          estimated_hours?: number
          actual_hours?: number
          due_date?: string
          sprint_week?: number
          created_at?: string
          updated_at?: string
          completed_at?: string | null
          in_progress_started_at?: string | null
          in_progress_total_seconds?: number
          last_status_change_at?: string
        }
      }
      milestones: {
        Row: {
          id: string
          project_id: string
          user_id: string
          title: string
          description: string | null
          target_date: string
          status: 'Not Started' | 'In Progress' | 'Completed'
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          title: string
          description?: string | null
          target_date: string
          status?: 'Not Started' | 'In Progress' | 'Completed'
          progress?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          title?: string
          description?: string | null
          target_date?: string
          status?: 'Not Started' | 'In Progress' | 'Completed'
          progress?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

// Create Supabase client for browser
export const createSupabaseClient = () => {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Server-side client (for API routes)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper function to get current user
export const getCurrentUser = async () => {
  const supabase = createSupabaseClient()
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
      // If there's an auth session missing error, return null instead of throwing
      if (error.message.includes('Auth session missing')) {
        return null
      }
      console.error('Error getting user:', error)
      return null
    }
    return user
  } catch (error) {
    console.error('Error in getCurrentUser:', error)
    return null
  }
}

// Helper function to sign in with email
export const signInWithEmail = async (email: string, password: string) => {
  const supabase = createSupabaseClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

// Helper function to sign up with email
export const signUpWithEmail = async (email: string, password: string) => {
  const supabase = createSupabaseClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

// Helper function to sign out
export const signOut = async () => {
  const supabase = createSupabaseClient()
  const { error } = await supabase.auth.signOut()
  return { error }
} 