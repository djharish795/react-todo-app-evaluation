import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PriorityBadge, { PrioritySelector } from './PriorityBadge';
import { formatDate, isOverdue, getRelativeTime } from '../utils/dateUtils';
import { useTaskContext } from '../context/TaskContext';

/**
 * TaskCard component displays individual task information with interactive controls
 * @param {Object} props - Component props
 * @param {Object} props.task - Task object containing all task details
 * @param {boolean} props.isEditing - Whether the card is in edit mode
 * @param {Function} props.onEditToggle - Callback to toggle edit mode
 */
const TaskCard = ({ task, isEditing = false, onEditToggle }) => {
  const { updateTask, deleteTask, toggleTask } = useTaskContext();
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate,
    category: task.category
  });

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save task changes
  const handleSave = () => {
    if (editForm.title.trim()) {
      updateTask({
        ...task,
        ...editForm,
        title: editForm.title.trim(),
        description: editForm.description.trim()
      });
      onEditToggle?.(false);
    }
  };

  // Cancel editing and reset form
  const handleCancel = () => {
    setEditForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category
    });
    onEditToggle?.(false);
  };

  // Handle task completion toggle
  const handleToggleComplete = () => {
    toggleTask(task.id);
  };

  // Handle task deletion with confirmation
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  // Determine card styling based on task state
  const getCardStyling = () => {
    let baseClasses = 'card transition-all duration-200 ';
    
    if (task.completed) {
      baseClasses += 'opacity-75 bg-gray-50 ';
    } else if (isOverdue(task.dueDate)) {
      baseClasses += 'border-l-4 border-l-danger-500 ';
    } else {
      baseClasses += 'hover:shadow-lg ';
    }
    
    return baseClasses;
  };

  const categories = [
    { value: 'work', label: 'Work', icon: '💼' },
    { value: 'personal', label: 'Personal', icon: '👤' },
    { value: 'health', label: 'Health', icon: '🏥' },
    { value: 'shopping', label: 'Shopping', icon: '🛒' },
    { value: 'other', label: 'Other', icon: '📝' }
  ];

  return (
    <article 
      className={getCardStyling()}
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox for task completion */}
        <div className="flex-shrink-0 pt-1">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              className="sr-only"
              aria-describedby={`task-${task.id}-description`}
            />
            <div className={`
              w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200
              ${task.completed 
                ? 'bg-success-500 border-success-500' 
                : 'border-gray-300 hover:border-primary-500'
              }
            `}>
              {task.completed && (
                <svg 
                  className="w-3 h-3 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
            </div>
            <span className="sr-only">
              {task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            </span>
          </label>
        </div>

        {/* Main task content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            // Edit mode
            <div className="space-y-4">
              {/* Title input */}
              <div>
                <label htmlFor={`title-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  id={`title-${task.id}`}
                  type="text"
                  value={editForm.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="input-field"
                  placeholder="Enter task title"
                  required
                />
              </div>

              {/* Description input */}
              <div>
                <label htmlFor={`description-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id={`description-${task.id}`}
                  value={editForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="input-field resize-none"
                  rows={2}
                  placeholder="Enter task description"
                />
              </div>

              {/* Priority selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <PrioritySelector
                  value={editForm.priority}
                  onChange={(priority) => handleInputChange('priority', priority)}
                  size="sm"
                />
              </div>

              {/* Due date and category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`dueDate-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    id={`dueDate-${task.id}`}
                    type="date"
                    value={editForm.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor={`category-${task.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id={`category-${task.id}`}
                    value={editForm.category}
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

              {/* Action buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSave}
                  disabled={!editForm.title.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View mode
            <div className="space-y-3">
              {/* Task header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 
                    className={`text-lg font-semibold ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                    id={`task-${task.id}-description`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className={`text-sm mt-1 ${
                      task.completed ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Priority badge */}
                <PriorityBadge 
                  priority={task.priority} 
                  size="sm"
                  className={task.completed ? 'opacity-50' : ''}
                />
              </div>

              {/* Task metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {/* Due date */}
                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <span role="img" aria-label="Due date">📅</span>
                    <span className={isOverdue(task.dueDate) && !task.completed ? 'text-danger-600 font-medium' : ''}>
                      {formatDate(task.dueDate)}
                      {isOverdue(task.dueDate) && !task.completed && (
                        <span className="ml-1 text-danger-600">(Overdue)</span>
                      )}
                    </span>
                  </div>
                )}

                {/* Category */}
                <div className="flex items-center gap-1">
                  <span role="img" aria-label="Category">
                    {categories.find(cat => cat.value === task.category)?.icon || '📝'}
                  </span>
                  <span className="capitalize">
                    {categories.find(cat => cat.value === task.category)?.label || task.category}
                  </span>
                </div>

                {/* Created date */}
                <div className="flex items-center gap-1">
                  <span role="img" aria-label="Created">➕</span>
                  <span>{getRelativeTime(task.createdAt)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons (view mode only) */}
        {!isEditing && (
          <div className="flex-shrink-0 flex gap-1">
            <button
              onClick={() => onEditToggle?.(true)}
              className="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label={`Edit ${task.title}`}
              title="Edit task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-danger-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label={`Delete ${task.title}`}
              title="Delete task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

// PropTypes for type checking and documentation
TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
    dueDate: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
  isEditing: PropTypes.bool,
  onEditToggle: PropTypes.func
};

TaskCard.defaultProps = {
  isEditing: false,
  onEditToggle: () => {}
};

export default TaskCard;
