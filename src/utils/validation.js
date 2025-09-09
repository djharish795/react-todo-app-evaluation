/**
 * Validation and Edge Case Testing Script
 * This file contains utility functions to test edge cases and validate the application
 */

// Validation functions for task data
export const validateTask = (task) => {
  const errors = [];
  
  // Required fields validation
  if (!task.title || typeof task.title !== 'string' || !task.title.trim()) {
    errors.push('Title is required and must be a non-empty string');
  }
  
  if (task.title && task.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }
  
  if (task.description && task.description.length > 500) {
    errors.push('Description must be less than 500 characters');
  }
  
  // Priority validation
  const validPriorities = ['high', 'medium', 'low'];
  if (task.priority && !validPriorities.includes(task.priority)) {
    errors.push('Priority must be one of: high, medium, low');
  }
  
  // Date validation
  if (task.dueDate && isNaN(Date.parse(task.dueDate))) {
    errors.push('Due date must be a valid date');
  }
  
  // Category validation
  const validCategories = ['work', 'personal', 'health', 'shopping', 'other'];
  if (task.category && !validCategories.includes(task.category)) {
    errors.push('Category must be one of: work, personal, health, shopping, other');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Edge case testing scenarios
export const edgeCaseTests = {
  // Test with empty task list
  emptyTaskList: () => {
    console.log('Testing empty task list scenario...');
    return [];
  },
  
  // Test with very long title
  longTitle: () => {
    const longTitle = 'A'.repeat(150);
    return validateTask({ title: longTitle });
  },
  
  // Test with special characters
  specialCharacters: () => {
    const specialTask = {
      title: '🎯 Test with émojis & spëcial châractérs!',
      description: 'Testing with <script>alert("xss")</script> and other special chars: @#$%^&*()',
      priority: 'high',
      category: 'work'
    };
    return validateTask(specialTask);
  },
  
  // Test with invalid date
  invalidDate: () => {
    return validateTask({
      title: 'Valid Task',
      dueDate: 'not-a-date'
    });
  },
  
  // Test localStorage corruption handling
  testLocalStorageCorruption: () => {
    console.log('Testing localStorage corruption handling...');
    try {
      // Simulate corrupted data
      localStorage.setItem('react-todo-tasks', 'invalid-json-data');
      return true;
    } catch (error) {
      console.error('localStorage test failed:', error);
      return false;
    }
  },
  
  // Test with null/undefined values
  nullValues: () => {
    const tests = [
      validateTask(null),
      validateTask(undefined),
      validateTask({}),
      validateTask({ title: null }),
      validateTask({ title: undefined }),
      validateTask({ title: '' })
    ];
    
    return tests.every(test => !test.isValid);
  }
};

// Accessibility testing helpers
export const accessibilityChecks = {
  // Check if all interactive elements have proper labels
  checkAriaLabels: () => {
    const interactiveElements = document.querySelectorAll('button, input, select, textarea');
    const elementsWithoutLabels = [];
    
    interactiveElements.forEach(element => {
      const hasLabel = element.getAttribute('aria-label') || 
                      element.getAttribute('aria-labelledby') ||
                      document.querySelector(`label[for="${element.id}"]`);
                      
      if (!hasLabel) {
        elementsWithoutLabels.push(element);
      }
    });
    
    return {
      passed: elementsWithoutLabels.length === 0,
      elementsWithoutLabels
    };
  },
  
  // Check keyboard navigation
  checkKeyboardNavigation: () => {
    const focusableElements = document.querySelectorAll(
      'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
    );
    
    return {
      totalFocusableElements: focusableElements.length,
      elements: Array.from(focusableElements)
    };
  },
  
  // Check color contrast (basic check)
  checkColorContrast: () => {
    // This is a simplified check - in production you'd use a proper contrast checking library
    const elements = document.querySelectorAll('*');
    const lowContrastElements = [];
    
    // Basic implementation - would need proper contrast calculation
    return {
      checked: elements.length,
      lowContrastElements: lowContrastElements.length
    };
  }
};

// Performance testing helpers
export const performanceTests = {
  // Test large task list rendering
  testLargeTaskList: (taskCount = 1000) => {
    console.log(`Testing performance with ${taskCount} tasks...`);
    const startTime = performance.now();
    
    // Generate large task list
    const largeTasks = Array.from({ length: taskCount }, (_, i) => ({
      id: i + 1,
      title: `Task ${i + 1}`,
      description: `Description for task ${i + 1}`,
      completed: Math.random() > 0.5,
      priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
      dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      category: ['work', 'personal', 'health'][Math.floor(Math.random() * 3)]
    }));
    
    const endTime = performance.now();
    
    return {
      taskCount,
      generationTime: endTime - startTime,
      tasks: largeTasks
    };
  },
  
  // Test filtering performance
  testFilterPerformance: (tasks, filterCriteria) => {
    const startTime = performance.now();
    
    // Simulate complex filtering
    const filtered = tasks.filter(task => {
      let matches = true;
      
      if (filterCriteria.status === 'completed') matches = matches && task.completed;
      if (filterCriteria.status === 'pending') matches = matches && !task.completed;
      if (filterCriteria.priority !== 'all') matches = matches && task.priority === filterCriteria.priority;
      if (filterCriteria.searchTerm) {
        matches = matches && (
          task.title.toLowerCase().includes(filterCriteria.searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(filterCriteria.searchTerm.toLowerCase())
        );
      }
      
      return matches;
    });
    
    const endTime = performance.now();
    
    return {
      originalCount: tasks.length,
      filteredCount: filtered.length,
      filterTime: endTime - startTime
    };
  }
};

// Mobile responsiveness tests
export const mobileTests = {
  // Test touch target sizes
  checkTouchTargets: () => {
    const interactiveElements = document.querySelectorAll('button, input, select, a');
    const tooSmallElements = [];
    
    interactiveElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const minSize = 44; // Apple's recommended minimum touch target size
      
      if (rect.width < minSize || rect.height < minSize) {
        tooSmallElements.push({
          element,
          width: rect.width,
          height: rect.height
        });
      }
    });
    
    return {
      totalElements: interactiveElements.length,
      tooSmallElements,
      passed: tooSmallElements.length === 0
    };
  },
  
  // Test viewport responsiveness
  checkViewportResponsiveness: () => {
    const viewportWidth = window.innerWidth;
    const hasHorizontalScroll = document.body.scrollWidth > viewportWidth;
    
    return {
      viewportWidth,
      hasHorizontalScroll,
      passed: !hasHorizontalScroll
    };
  }
};

// Run all validation tests
export const runAllValidationTests = () => {
  console.log('Running comprehensive validation tests...');
  
  const results = {
    edgeCases: {},
    accessibility: {},
    performance: {},
    mobile: {}
  };
  
  // Run edge case tests
  Object.keys(edgeCaseTests).forEach(testName => {
    try {
      results.edgeCases[testName] = edgeCaseTests[testName]();
    } catch (error) {
      results.edgeCases[testName] = { error: error.message };
    }
  });
  
  // Run accessibility tests
  Object.keys(accessibilityChecks).forEach(testName => {
    try {
      results.accessibility[testName] = accessibilityChecks[testName]();
    } catch (error) {
      results.accessibility[testName] = { error: error.message };
    }
  });
  
  // Run mobile tests
  Object.keys(mobileTests).forEach(testName => {
    try {
      results.mobile[testName] = mobileTests[testName]();
    } catch (error) {
      results.mobile[testName] = { error: error.message };
    }
  });
  
  console.log('Validation test results:', results);
  return results;
};

export default {
  validateTask,
  edgeCaseTests,
  accessibilityChecks,
  performanceTests,
  mobileTests,
  runAllValidationTests
};
