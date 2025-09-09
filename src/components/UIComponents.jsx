import React from 'react';
import PropTypes from 'prop-types';

/**
 * LoadingSpinner Component for indicating loading states
 * @param {Object} props - Component props
 * @param {string} props.size - Spinner size ('sm', 'md', 'lg')
 * @param {string} props.color - Spinner color
 * @param {string} props.message - Loading message to display
 */
const LoadingSpinner = ({ 
  size = 'md', 
  color = 'text-primary-500',
  message = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <svg
        className={`${sizeClasses[size]} ${color} animate-spin`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        role="status"
        aria-label={message}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {message && (
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.string,
  message: PropTypes.string
};

/**
 * ErrorMessage Component for displaying error states
 * @param {Object} props - Component props
 * @param {string} props.message - Error message
 * @param {Function} props.onRetry - Retry function
 * @param {string} props.type - Error type ('error', 'warning', 'info')
 */
export const ErrorMessage = ({ 
  message, 
  onRetry, 
  type = 'error' 
}) => {
  const typeStyles = {
    error: 'bg-danger-100 text-danger-700 border-danger-200',
    warning: 'bg-warning-100 text-warning-700 border-warning-200',
    info: 'bg-primary-100 text-primary-700 border-primary-200'
  };

  const icons = {
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={`
      rounded-lg border p-4 ${typeStyles[type]}
    `} role="alert">
      <div className="flex items-start gap-3">
        <span className="text-lg" role="img" aria-hidden="true">
          {icons[type]}
        </span>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
  type: PropTypes.oneOf(['error', 'warning', 'info'])
};

/**
 * EmptyState Component for when no data is available
 * @param {Object} props - Component props
 * @param {string} props.title - Empty state title
 * @param {string} props.description - Empty state description
 * @param {string} props.icon - Icon to display
 * @param {React.ReactNode} props.action - Action button or component
 */
export const EmptyState = ({ 
  title, 
  description, 
  icon = '📝', 
  action 
}) => {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4" role="img" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-500 mb-4 max-w-sm mx-auto">
          {description}
        </p>
      )}
      {action}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.string,
  action: PropTypes.node
};

export default LoadingSpinner;
