import React, { useState } from 'react';
import { PriorityFilter } from './PriorityBadge';
import { useTaskContext } from '../context/TaskContext';

/**
 * FilterBar component provides comprehensive filtering and sorting options for tasks
 */
const FilterBar = () => {
  const { 
    filters, 
    sortBy, 
    sortOrder, 
    setFilter, 
    setSearchTerm, 
    setSort, 
    resetFilters,
    tasks 
  } = useTaskContext();

  const [isExpanded, setIsExpanded] = useState(false);

  // Filter options configuration
  const statusOptions = [
    { value: 'all', label: 'All Tasks', icon: '📋', count: tasks.length },
    { value: 'pending', label: 'Pending', icon: '⏳', count: tasks.filter(t => !t.completed).length },
    { value: 'completed', label: 'Completed', icon: '✅', count: tasks.filter(t => t.completed).length }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories', icon: '📂' },
    { value: 'work', label: 'Work', icon: '💼' },
    { value: 'personal', label: 'Personal', icon: '👤' },
    { value: 'health', label: 'Health', icon: '🏥' },
    { value: 'shopping', label: 'Shopping', icon: '🛒' },
    { value: 'other', label: 'Other', icon: '📝' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Dates', icon: '📅' },
    { value: 'today', label: 'Due Today', icon: '🔔' },
    { value: 'week', label: 'This Week', icon: '📆' },
    { value: 'overdue', label: 'Overdue', icon: '⚠️' }
  ];

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date', icon: '📅' },
    { value: 'priority', label: 'Priority', icon: '🔥' },
    { value: 'createdAt', label: 'Created Date', icon: '➕' },
    { value: 'title', label: 'Title', icon: '🔤' }
  ];

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      // Toggle sort order if same field
      setSort(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with ascending order
      setSort(newSortBy, 'asc');
    }
  };

  // Get active filter count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status !== 'all') count++;
    if (filters.priority !== 'all') count++;
    if (filters.category !== 'all') count++;
    if (filters.dateRange !== 'all') count++;
    if (filters.searchTerm.trim()) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
      {/* Search and Quick Actions Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <label htmlFor="task-search" className="sr-only">
            Search tasks
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            <input
              id="task-search"
              type="text"
              value={filters.searchTerm}
              onChange={handleSearchChange}
              placeholder="Search tasks..."
              className="input-field pl-10"
            />
            {filters.searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Clear search"
              >
                <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
              ${isExpanded 
                ? 'bg-primary-500 text-white border-primary-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }
            `}
            aria-expanded={isExpanded}
            aria-controls="filter-options"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-white text-primary-600 text-xs px-2 py-0.5 rounded-full font-semibold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="btn-secondary text-sm"
              title="Clear all filters"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filter Options */}
      {isExpanded && (
        <div id="filter-options" className="space-y-6 pt-4 border-t border-gray-200">
          {/* Status Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Status</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter('status', option.value)}
                  className={`
                    inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
                    ${filters.status === option.value
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }
                  `}
                  aria-pressed={filters.status === option.value}
                >
                  <span role="img" aria-hidden="true">{option.icon}</span>
                  <span>{option.label}</span>
                  <span className={`
                    text-xs px-2 py-0.5 rounded-full
                    ${filters.status === option.value
                      ? 'bg-white text-primary-600'
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {option.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Priority</h3>
            <PriorityFilter
              value={filters.priority}
              onChange={(priority) => setFilter('priority', priority)}
            />
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter('category', option.value)}
                  className={`
                    inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
                    ${filters.category === option.value
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }
                  `}
                  aria-pressed={filters.category === option.value}
                >
                  <span role="img" aria-hidden="true">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Due Date</h3>
            <div className="flex flex-wrap gap-2">
              {dateRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter('dateRange', option.value)}
                  className={`
                    inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
                    ${filters.dateRange === option.value
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }
                  `}
                  aria-pressed={filters.dateRange === option.value}
                >
                  <span role="img" aria-hidden="true">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`
                    inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
                    ${sortBy === option.value
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }
                  `}
                  aria-pressed={sortBy === option.value}
                >
                  <span role="img" aria-hidden="true">{option.icon}</span>
                  <span>{option.label}</span>
                  {sortBy === option.value && (
                    <span className="text-xs">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary (when collapsed) */}
      {!isExpanded && activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="text-gray-500">Active filters:</span>
          {filters.status !== 'all' && (
            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
              Status: {statusOptions.find(o => o.value === filters.status)?.label}
            </span>
          )}
          {filters.priority !== 'all' && (
            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
              Priority: {filters.priority}
            </span>
          )}
          {filters.category !== 'all' && (
            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
              Category: {categoryOptions.find(o => o.value === filters.category)?.label}
            </span>
          )}
          {filters.dateRange !== 'all' && (
            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
              Date: {dateRangeOptions.find(o => o.value === filters.dateRange)?.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
