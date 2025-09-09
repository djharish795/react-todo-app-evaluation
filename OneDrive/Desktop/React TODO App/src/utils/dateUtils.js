/**
 * Utility functions for date manipulation and formatting
 */

/**
 * Format a date string to a more readable format
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Reset time for accurate comparison
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
  
  if (dateOnly.getTime() === todayOnly.getTime()) {
    return 'Today';
  } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
};

/**
 * Format a date for display with full context
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Full formatted date string
 */
export const formatFullDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Check if a date is overdue
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {boolean} True if the date is overdue
 */
export const isOverdue = (dateString) => {
  if (!dateString) return false;
  
  const dueDate = new Date(dateString);
  const today = new Date();
  
  // Reset time for accurate comparison
  const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  return dueDateOnly < todayOnly;
};

/**
 * Check if a date is today
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {boolean} True if the date is today
 */
export const isToday = (dateString) => {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  const today = new Date();
  
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if a date is within the current week
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {boolean} True if the date is within this week
 */
export const isThisWeek = (dateString) => {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  const today = new Date();
  
  // Get the start of the week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  // Get the end of the week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return date >= startOfWeek && date <= endOfWeek;
};

/**
 * Get the number of days between two dates
 * @param {string} dateString1 - First date (ISO format)
 * @param {string} dateString2 - Second date (ISO format)
 * @returns {number} Number of days between the dates
 */
export const getDaysBetween = (dateString1, dateString2) => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  const timeDifference = Math.abs(date2 - date1);
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
};

/**
 * Get the current date in ISO format (YYYY-MM-DD)
 * @returns {string} Current date in ISO format
 */
export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Add days to a date
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @param {number} days - Number of days to add
 * @returns {string} New date in ISO format
 */
export const addDays = (dateString, days) => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

/**
 * Get a human-readable relative time string
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Relative time string (e.g., "2 days ago", "in 3 days")
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Tomorrow';
  } else if (diffDays === -1) {
    return 'Yesterday';
  } else if (diffDays > 1) {
    return `In ${diffDays} days`;
  } else {
    return `${Math.abs(diffDays)} days ago`;
  }
};

/**
 * Sort dates in ascending or descending order
 * @param {Array} dates - Array of date strings
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted array of dates
 */
export const sortDates = (dates, order = 'asc') => {
  return dates.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    
    if (order === 'desc') {
      return dateB - dateA;
    }
    return dateA - dateB;
  });
};
