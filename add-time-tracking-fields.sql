-- Migration script to add time tracking fields to existing tasks
-- Run this in your Supabase SQL Editor

-- Add new time tracking columns to tasks table
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS in_progress_started_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS in_progress_total_seconds INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_status_change_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing tasks to initialize the new fields
UPDATE tasks 
SET 
  in_progress_total_seconds = 0,
  last_status_change_at = COALESCE(updated_at, created_at),
  in_progress_started_at = CASE 
    WHEN status = 'In Progress' THEN updated_at 
    ELSE NULL 
  END
WHERE in_progress_total_seconds IS NULL; 