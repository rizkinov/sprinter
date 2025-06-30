import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Code, Palette, CheckCircle, Edit, TrendingUp, BarChart3, Activity, Folder, MessageSquare, Star, FileText, Users, DollarSign, Scale, Settings, Lightbulb, Target } from "lucide-react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get category icon based on category name
export function getCategoryIcon(category: string) {
  // Handle exact matches first
  switch (category) {
    case 'Development': return Code
    case 'Design': return Palette
    case 'Testing': return CheckCircle
    case 'Documentation': return Edit
    case 'Marketing': return TrendingUp
    case 'Research': return BarChart3
    case 'Strategy': return Lightbulb
    case 'Communication': return MessageSquare
    case 'Administration': return FileText
    case 'Finance': return DollarSign
    case 'Legal': return Scale
    case 'Operations': return Settings
    case 'Planning': return Target
    case 'Misc': return Star
    default: {
      // Handle partial matches and common keywords
      const lowerCategory = category.toLowerCase()
      if (lowerCategory.includes('dev') || lowerCategory.includes('code') || lowerCategory.includes('setup')) {
        return Code
      }
      if (lowerCategory.includes('design') || lowerCategory.includes('ui') || lowerCategory.includes('ux')) {
        return Palette
      }
      if (lowerCategory.includes('test') || lowerCategory.includes('qa')) {
        return CheckCircle
      }
      if (lowerCategory.includes('doc') || lowerCategory.includes('write')) {
        return Edit
      }
      if (lowerCategory.includes('market') || lowerCategory.includes('promo')) {
        return TrendingUp
      }
      if (lowerCategory.includes('research') || lowerCategory.includes('analysis')) {
        return BarChart3
      }
      if (lowerCategory.includes('strategy') || lowerCategory.includes('strategic')) {
        return Lightbulb
      }
      if (lowerCategory.includes('communication') || lowerCategory.includes('message') || lowerCategory.includes('chat')) {
        return MessageSquare
      }
      if (lowerCategory.includes('admin') || lowerCategory.includes('administrative')) {
        return FileText
      }
      if (lowerCategory.includes('finance') || lowerCategory.includes('financial') || lowerCategory.includes('money') || lowerCategory.includes('budget')) {
        return DollarSign
      }
      if (lowerCategory.includes('legal') || lowerCategory.includes('law') || lowerCategory.includes('compliance')) {
        return Scale
      }
      if (lowerCategory.includes('operation') || lowerCategory.includes('ops') || lowerCategory.includes('process')) {
        return Settings
      }
      if (lowerCategory.includes('folder') || lowerCategory.includes('file') || lowerCategory.includes('organiz')) {
        return Folder
      }
      if (lowerCategory.includes('team') || lowerCategory.includes('meeting') || lowerCategory.includes('collaboration')) {
        return Users
      }
      if (lowerCategory.includes('misc') || lowerCategory.includes('other') || lowerCategory.includes('general')) {
        return Star
      }
      // Default fallback
      return Activity
    }
  }
}
