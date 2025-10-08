'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from './button'

interface FilterOption {
  id: string
  label: string
  value: string
}

interface FilterBarProps {
  onSearch?: (query: string) => void
  onFilterChange?: (filters: Record<string, string[]>) => void
  filterGroups?: {
    id: string
    label: string
    options: FilterOption[]
  }[]
}

export function FilterBar({
  onSearch,
  onFilterChange,
  filterGroups = []
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch?.(query)
  }

  const handleFilterToggle = (groupId: string, optionValue: string) => {
    setSelectedFilters(prev => {
      const groupFilters = prev[groupId] || []
      const newGroupFilters = groupFilters.includes(optionValue)
        ? groupFilters.filter(v => v !== optionValue)
        : [...groupFilters, optionValue]

      const updated = {
        ...prev,
        [groupId]: newGroupFilters
      }

      onFilterChange?.(updated)
      return updated
    })
  }

  const clearFilters = () => {
    setSelectedFilters({})
    setSearchQuery('')
    onFilterChange?.({})
    onSearch?.('')
  }

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (count, filters) => count + filters.length,
    0
  )

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      {/* Search Bar */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="国名、都市名で検索..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          className="flex items-center gap-2 px-6"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="w-4 h-4" />
          フィルター
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">絞り込み条件</h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                クリア
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filterGroups.map(group => (
              <div key={group.id}>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {group.label}
                </label>
                <div className="space-y-2">
                  {group.options.map(option => {
                    const isSelected = selectedFilters[group.id]?.includes(option.value)
                    return (
                      <label
                        key={option.id}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleFilterToggle(group.id, option.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900">
                          {option.label}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}