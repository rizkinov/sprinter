'use client'

import React from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface SearchAndFilterProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  statusFilter: string
  onStatusFilterChange: (status: string) => void
  priorityFilter: string
  onPriorityFilterChange: (priority: string) => void
  categoryFilter: string
  onCategoryFilterChange: (category: string) => void
  availableCategories: string[]
  showFilters: boolean
  onToggleFilters: () => void
  onClearFilters: () => void
  placeholder?: string
}

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  availableCategories,
  showFilters,
  onToggleFilters,
  onClearFilters,
  placeholder = 'Search tasks...'
}: SearchAndFilterProps) {
  const hasActiveFilters = statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all' || searchTerm.length > 0

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <button
          onClick={onToggleFilters}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
            showFilters 
              ? 'bg-gray-900 text-white border-gray-900' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Filter size={16} />
          Filters
          {hasActiveFilters && (
            <span className="bg-red-500 text-white text-xs rounded-full w-2 h-2"></span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-600 hover:text-gray-900 px-2 py-1 rounded transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {availableCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 