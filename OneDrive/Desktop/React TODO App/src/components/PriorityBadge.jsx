import React from 'react';

/**
 * PriorityBadge component displays a visual indicator for task priority levels
 * @param {Object} props - Component props
 * @param {string} props.priority - Priority level ('high', 'medium', 'low')
 * @param {string} props.size - Badge size ('sm', 'md', 'lg')
 * @param {boolean} props.showText - Whether to show priority text
 * @param {string} props.className - Additional CSS classes
 */
const PriorityBadge = ({ 
  priority = 'medium', 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  // Define priority configurations
  const priorityConfig = {
    high: {
      colors: 'bg-danger-100 text-danger-600 border-danger-200',
      icon: '🔴',
      text: 'High Priority',
      shortText: 'High'
    },
    medium: {
      colors: 'bg-warning-100 text-warning-600 border-warning-200',
      icon: '🟡',
      text: 'Medium Priority',
      shortText: 'Medium'
    },
    low: {
      colors: 'bg-success-100 text-success-600 border-success-200',
      icon: '🟢',
      text: 'Low Priority',
      shortText: 'Low'
    }
  };

  // Define size configurations
  const sizeConfig = {
    sm: {
      padding: 'px-2 py-1',
      text: 'text-xs',
      icon: 'text-xs'
    },
    md: {
      padding: 'px-3 py-1',
      text: 'text-sm',
      icon: 'text-sm'
    },
    lg: {
      padding: 'px-4 py-2',
      text: 'text-base',
      icon: 'text-base'
    }
  };

  const currentPriority = priorityConfig[priority] || priorityConfig.medium;
  const currentSize = sizeConfig[size] || sizeConfig.md;

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full border font-medium
        ${currentPriority.colors}
        ${currentSize.padding}
        ${currentSize.text}
        ${className}
      `}
      role="status"
      aria-label={currentPriority.text}
      title={currentPriority.text}
    >
      <span 
        className={`${currentSize.icon}`}
        role="img" 
        aria-hidden="true"
      >
        {currentPriority.icon}
      </span>
      {showText && (
        <span className="font-medium">
          {size === 'sm' ? currentPriority.shortText : currentPriority.shortText}
        </span>
      )}
    </span>
  );
};

/**
 * PrioritySelector component for selecting priority levels
 * @param {Object} props - Component props
 * @param {string} props.value - Current priority value
 * @param {Function} props.onChange - Callback function when priority changes
 * @param {string} props.size - Selector size
 * @param {boolean} props.disabled - Whether the selector is disabled
 */
export const PrioritySelector = ({ 
  value = 'medium', 
  onChange, 
  size = 'md',
  disabled = false 
}) => {
  const priorities = ['high', 'medium', 'low'];

  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Task priority">
      {priorities.map((priority) => (
        <label key={priority} className="cursor-pointer">
          <input
            type="radio"
            name="priority"
            value={priority}
            checked={value === priority}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className="sr-only"
            aria-describedby={`priority-${priority}-description`}
          />
          <PriorityBadge
            priority={priority}
            size={size}
            className={`
              cursor-pointer transition-all duration-200 
              ${value === priority 
                ? 'ring-2 ring-primary-500 ring-offset-1' 
                : 'hover:shadow-sm'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          />
          <span id={`priority-${priority}-description`} className="sr-only">
            Select {priority} priority
          </span>
        </label>
      ))}
    </div>
  );
};

/**
 * PriorityFilter component for filtering tasks by priority
 * @param {Object} props - Component props
 * @param {string} props.value - Current filter value
 * @param {Function} props.onChange - Callback function when filter changes
 */
export const PriorityFilter = ({ value = 'all', onChange }) => {
  const filterOptions = [
    { value: 'all', label: 'All Priorities', icon: '📋' },
    { value: 'high', label: 'High Priority', icon: '🔴' },
    { value: 'medium', label: 'Medium Priority', icon: '🟡' },
    { value: 'low', label: 'Low Priority', icon: '🟢' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange?.(option.value)}
          className={`
            inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500
            ${value === option.value
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }
          `}
          aria-pressed={value === option.value}
          type="button"
        >
          <span role="img" aria-hidden="true">{option.icon}</span>
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default PriorityBadge;
