import React, { useState, useMemo } from 'react';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';
import Button from '../components/Button';
import Input from '../components/Input';
import LoadingSpinner, { ErrorMessage, EmptyState } from '../components/UIComponents';
import { PrioritySelector } from '../components/PriorityBadge';
import { useTaskContext } from '../context/TaskContext';
import { isOverdue, isToday, isThisWeek, getCurrentDate } from '../utils/dateUtils';

/**
 * Home page component - Main dashboard for task management
 * Includes comprehensive error handling, loading states, and accessibility features
 */
const Home = () => {
  const { 
    tasks, 
    filters, 
    sortBy, 
    sortOrder, 
    addTask, 
    clearCompleted,
    isLoading,
    error,
    clearError
  } = useTaskContext();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: getCurrentDate(),
    category: 'personal'
  });

  // Filter and sort tasks based on current filters
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      // Status filter
      if (filters.status === 'completed' && !task.completed) return false;
      if (filters.status === 'pending' && task.completed) return false;

      // Priority filter
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false;

      // Category filter
      if (filters.category !== 'all' && task.category !== filters.category) return false;

      // Date range filter
      if (filters.dateRange !== 'all') {
        switch (filters.dateRange) {
          case 'today':
            if (!isToday(task.dueDate)) return false;
            break;
          case 'week':
            if (!isThisWeek(task.dueDate)) return false;
            break;
          case 'overdue':
            if (!isOverdue(task.dueDate) || task.completed) return false;
            break;
          default:
            break;
        }
      }

      // Search filter
      if (filters.searchTerm.trim()) {
        const searchLower = filters.searchTerm.toLowerCase();
        const titleMatch = task.title.toLowerCase().includes(searchLower);
        const descriptionMatch = task.description?.toLowerCase().includes(searchLower);
        if (!titleMatch && !descriptionMatch) return false;
      }

      return true;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
        case 'dueDate':
        default:
          // Handle missing due dates (put them last)
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          comparison = new Date(a.dueDate) - new Date(b.dueDate);
          break;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [tasks, filters, sortBy, sortOrder]);

  // Handle new task form submission with validation
  const handleAddTask = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setFormErrors({});
    
    // Validate form
    const errors = {};
    if (!newTask.title.trim()) {
      errors.title = 'Task title is required';
    }
    if (newTask.title.trim().length > 100) {
      errors.title = 'Task title must be less than 100 characters';
    }
    if (newTask.description.length > 500) {
      errors.description = 'Description must be less than 500 characters';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      setIsSubmitting(true);
      await addTask({
        ...newTask,
        title: newTask.title.trim(),
        description: newTask.description.trim()
      });
      
      // Reset form on success
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: getCurrentDate(),
        category: 'personal'
      });
      setShowAddForm(false);
      setFormErrors({});
    } catch (error) {
      setFormErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes for new task form
  const handleInputChange = (field, value) => {
    setNewTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Get task statistics
  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(t => isOverdue(t.dueDate) && !t.completed).length;
    const dueToday = tasks.filter(t => isToday(t.dueDate) && !t.completed).length;

    return { total, completed, pending, overdue, dueToday };
  }, [tasks]);

  const categories = [
    { value: 'work', label: 'Work', icon: '💼' },
    { value: 'personal', label: 'Personal', icon: '👤' },
    { value: 'health', label: 'Health', icon: '🏥' },
    { value: 'shopping', label: 'Shopping', icon: '🛒' },
    { value: 'other', label: 'Other', icon: '📝' }
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading your tasks..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              📝 Task Manager
            </h1>
            <p className="text-gray-600">
              Stay organized and boost your productivity
            </p>
          </div>

          {/* Task Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
              <div className="text-2xl font-bold text-gray-900">{taskStats.total}</div>
              <div className="text-sm text-gray-500">Total Tasks</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
              <div className="text-2xl font-bold text-success-600">{taskStats.completed}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
              <div className="text-2xl font-bold text-primary-600">{taskStats.pending}</div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
              <div className="text-2xl font-bold text-warning-600">{taskStats.dueToday}</div>
              <div className="text-sm text-gray-500">Due Today</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm border">
              <div className="text-2xl font-bold text-danger-600">{taskStats.overdue}</div>
              <div className="text-sm text-gray-500">Overdue</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              {showAddForm ? 'Cancel' : '+ Add New Task'}
            </Button>
            
            {taskStats.completed > 0 && (
              <Button
                variant="secondary"
                onClick={clearCompleted}
                ariaLabel={`Remove all ${taskStats.completed} completed tasks`}
              >
                Clear Completed ({taskStats.completed})
              </Button>
            )}
          </div>
        </header>

        {/* Global Error Message */}
        {error && (
          <div className="mb-6">
            <ErrorMessage 
              message={error} 
              onRetry={clearError}
              type="error"
            />
          </div>
        )}

        {/* Add Task Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Task</h2>
            
            <form onSubmit={handleAddTask} className="space-y-4">
              {/* Form Error Message */}
              {formErrors.submit && (
                <ErrorMessage 
                  message={formErrors.submit} 
                  type="error"
                />
              )}
              
              {/* Title */}
              <Input
                id="new-task-title"
                label="Title"
                type="text"
                value={newTask.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter task title"
                required
                error={formErrors.title}
                disabled={isSubmitting}
              />

              {/* Description */}
              <div>
                <label htmlFor="new-task-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="new-task-description"
                  value={newTask.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`input-field resize-none ${formErrors.description ? 'border-danger-500' : ''}`}
                  rows={3}
                  placeholder="Enter task description (optional)"
                  disabled={isSubmitting}
                />
                {formErrors.description && (
                  <p className="text-sm text-danger-600 mt-1">{formErrors.description}</p>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <PrioritySelector
                  value={newTask.priority}
                  onChange={(priority) => handleInputChange('priority', priority)}
                />
              </div>

              {/* Due Date and Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="new-task-due-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    id="new-task-due-date"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="new-task-category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="new-task-category"
                    value={newTask.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="input-field"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={!newTask.title.trim() || isSubmitting}
                  loading={isSubmitting}
                >
                  Create Task
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowAddForm(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar />

        {/* Task List */}
        <main className="mt-6">
          {filteredAndSortedTasks.length === 0 ? (
            <EmptyState
              title={tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
              description={
                tasks.length === 0 
                  ? 'Create your first task to get started!' 
                  : 'Try adjusting your filters or search terms.'
              }
              icon="📝"
              action={
                tasks.length === 0 && !showAddForm ? (
                  <Button onClick={() => setShowAddForm(true)}>
                    Create Your First Task
                  </Button>
                ) : null
              }
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Tasks ({filteredAndSortedTasks.length})
                </h2>
                <div className="text-sm text-gray-500">
                  Sorted by {sortBy} ({sortOrder === 'asc' ? 'ascending' : 'descending'})
                </div>
              </div>

              {/* Task Cards */}
              <div className="space-y-3">
                {filteredAndSortedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isEditing={editingTaskId === task.id}
                    onEditToggle={(isEditing) => 
                      setEditingTaskId(isEditing ? task.id : null)
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Built with React • Tailwind CSS • Context API</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
