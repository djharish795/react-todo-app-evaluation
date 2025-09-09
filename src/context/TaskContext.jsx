import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

// Initial state for the task management system
const initialState = {
  tasks: [
    {
      id: 1,
      title: 'Complete project proposal',
      description: 'Write and submit the Q4 project proposal document',
      completed: false,
      priority: 'high',
      dueDate: '2025-09-15',
      createdAt: '2025-09-09',
      category: 'work'
    },
    {
      id: 2,
      title: 'Buy groceries',
      description: 'Get milk, bread, eggs, and vegetables',
      completed: false,
      priority: 'medium',
      dueDate: '2025-09-10',
      createdAt: '2025-09-08',
      category: 'personal'
    },
    {
      id: 3,
      title: 'Schedule dentist appointment',
      description: 'Call dentist office to schedule routine cleaning',
      completed: true,
      priority: 'low',
      dueDate: '2025-09-12',
      createdAt: '2025-09-07',
      category: 'health'
    }
  ],
  filters: {
    status: 'all', // 'all', 'completed', 'pending'
    priority: 'all', // 'all', 'high', 'medium', 'low'
    category: 'all', // 'all', 'work', 'personal', 'health'
    dateRange: 'all', // 'all', 'today', 'week', 'overdue'
    searchTerm: ''
  },
  sortBy: 'dueDate', // 'dueDate', 'priority', 'createdAt', 'title'
  sortOrder: 'asc' // 'asc', 'desc'
};

// Action types for the reducer
const actionTypes = {
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_SORT: 'SET_SORT',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  RESET_FILTERS: 'RESET_FILTERS',
  RESTORE_TASK: 'RESTORE_TASK' // For restoring tasks from localStorage
};

// Reducer function to manage state changes
// This centralized approach ensures predictable state updates and easier debugging
function taskReducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
            id: Date.now(), // Simple ID generation - could use uuid in production
            completed: false,
            createdAt: new Date().toISOString().split('T')[0]
          }
        ]
      };

    case actionTypes.UPDATE_TASK:
      // Find and update the specific task while preserving others
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload } // Merge existing task with updates
            : task
        )
      };

    case actionTypes.DELETE_TASK:
      // Remove task by filtering out the specified ID
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case actionTypes.TOGGLE_TASK:
      // Toggle completion status for the specified task
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };

    case actionTypes.SET_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filterType]: action.payload.value
        }
      };

    case actionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        filters: {
          ...state.filters,
          searchTerm: action.payload
        }
      };

    case actionTypes.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder
      };

    case actionTypes.CLEAR_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.filter(task => !task.completed)
      };

    case actionTypes.RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
        sortBy: initialState.sortBy,
        sortOrder: initialState.sortOrder
      };

    case actionTypes.RESTORE_TASK:
      // Special action for restoring tasks from localStorage without generating new IDs
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.payload // Use the task exactly as stored
        ]
      };

    default:
      return state;
  }
}

// Create context
const TaskContext = createContext();

// Custom hook to use the task context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

// Task Provider component with enhanced error handling
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load tasks from localStorage on component mount
  // This effect runs once when the TaskProvider is first rendered
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const savedTasks = localStorage.getItem('react-todo-tasks');
        if (savedTasks) {
          // Parse the JSON string back to an array of task objects
          const parsedTasks = JSON.parse(savedTasks);
          
          // Validate that parsedTasks is an array and contains valid task objects
          if (Array.isArray(parsedTasks)) {
            // Reset to initial state first, then add saved tasks
            dispatch({ type: actionTypes.RESET_FILTERS });
            
            // Filter out any invalid tasks and add valid ones
            const validTasks = parsedTasks.filter(task => 
              task && 
              typeof task === 'object' && 
              task.title && 
              typeof task.title === 'string'
            );
            
            // Restore each valid task
            validTasks.forEach(task => {
              dispatch({
                type: 'RESTORE_TASK', // Special action for restoring without new ID
                payload: task
              });
            });
          }
        }
      } catch (error) {
        // Handle corrupted localStorage data gracefully
        console.error('Error loading tasks from localStorage:', error);
        setError('Failed to load saved tasks. Starting with a fresh list.');
        // Clear corrupted data
        localStorage.removeItem('react-todo-tasks');
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Save tasks to localStorage whenever the tasks array changes
  // This ensures data persistence across browser sessions
  useEffect(() => {
    // Only save if we have tasks to avoid overwriting with empty array on initial load
    if (state.tasks.length > 0 && !isLoading) {
      try {
        localStorage.setItem('react-todo-tasks', JSON.stringify(state.tasks));
      } catch (error) {
        console.error('Failed to save tasks to localStorage:', error);
        setError('Failed to save tasks. Your changes may not persist.');
      }
    }
  }, [state.tasks, isLoading]);

  // Action creators with error handling
  const actions = {
    addTask: (task) => {
      try {
        // Validate required fields
        if (!task.title || typeof task.title !== 'string' || !task.title.trim()) {
          throw new Error('Task title is required');
        }
        
        dispatch({
          type: actionTypes.ADD_TASK,
          payload: {
            ...task,
            title: task.title.trim(),
            description: task.description?.trim() || '',
            priority: task.priority || 'medium',
            category: task.category || 'personal'
          }
        });
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error adding task:', error);
        setError(error.message);
      }
    },

    updateTask: (task) => {
      try {
        if (!task.id) {
          throw new Error('Task ID is required for updates');
        }
        if (!task.title || !task.title.trim()) {
          throw new Error('Task title cannot be empty');
        }
        
        dispatch({
          type: actionTypes.UPDATE_TASK,
          payload: {
            ...task,
            title: task.title.trim(),
            description: task.description?.trim() || ''
          }
        });
        setError(null);
      } catch (error) {
        console.error('Error updating task:', error);
        setError(error.message);
      }
    },

    deleteTask: (taskId) => {
      try {
        if (!taskId) {
          throw new Error('Task ID is required for deletion');
        }
        
        dispatch({
          type: actionTypes.DELETE_TASK,
          payload: taskId
        });
        setError(null);
      } catch (error) {
        console.error('Error deleting task:', error);
        setError(error.message);
      }
    },

    toggleTask: (taskId) => {
      try {
        if (!taskId) {
          throw new Error('Task ID is required');
        }
        
        dispatch({
          type: actionTypes.TOGGLE_TASK,
          payload: taskId
        });
        setError(null);
      } catch (error) {
        console.error('Error toggling task:', error);
        setError(error.message);
      }
    },

    setFilter: (filterType, value) => {
      dispatch({
        type: actionTypes.SET_FILTER,
        payload: { filterType, value }
      });
    },

    setSearchTerm: (searchTerm) => {
      dispatch({
        type: actionTypes.SET_SEARCH_TERM,
        payload: searchTerm
      });
    },

    setSort: (sortBy, sortOrder) => {
      dispatch({
        type: actionTypes.SET_SORT,
        payload: { sortBy, sortOrder }
      });
    },

    clearCompleted: () => {
      dispatch({
        type: actionTypes.CLEAR_COMPLETED
      });
    },

    resetFilters: () => {
      dispatch({
        type: actionTypes.RESET_FILTERS
      });
    },

    // Error handling actions
    clearError: () => {
      setError(null);
    }
  };

  const value = {
    ...state,
    ...actions,
    isLoading,
    error
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
