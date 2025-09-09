import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from './FilterBar';
import { TaskProvider } from '../context/TaskContext';

const TestWrapper = ({ children }) => (
  <TaskProvider>
    {children}
  </TaskProvider>
);

describe('FilterBar Component', () => {
  test('renders search input', () => {
    render(<FilterBar />, { wrapper: TestWrapper });
    expect(screen.getByPlaceholderText(/Search tasks/i)).toBeInTheDocument();
  });

  test('expands and collapses filter options', async () => {
    const user = userEvent.setup();
    render(<FilterBar />, { wrapper: TestWrapper });
    
    const filterButton = screen.getByText(/Filters/i);
    
    // Initially collapsed
    expect(screen.queryByText(/All Categories/i)).not.toBeInTheDocument();
    
    // Expand
    await user.click(filterButton);
    expect(screen.getByText(/All Categories/i)).toBeInTheDocument();
    
    // Collapse
    await user.click(filterButton);
    expect(screen.queryByText(/All Categories/i)).not.toBeInTheDocument();
  });

  test('updates search term', async () => {
    const user = userEvent.setup();
    render(<FilterBar />, { wrapper: TestWrapper });
    
    const searchInput = screen.getByPlaceholderText(/Search tasks/i);
    await user.type(searchInput, 'test search');
    
    expect(searchInput).toHaveValue('test search');
  });

  test('clears search when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<FilterBar />, { wrapper: TestWrapper });
    
    const searchInput = screen.getByPlaceholderText(/Search tasks/i);
    await user.type(searchInput, 'test');
    
    const clearButton = screen.getByLabelText(/Clear search/i);
    await user.click(clearButton);
    
    expect(searchInput).toHaveValue('');
  });

  test('shows active filter count', async () => {
    const user = userEvent.setup();
    render(<FilterBar />, { wrapper: TestWrapper });
    
    // Expand filters
    await user.click(screen.getByText(/Filters/i));
    
    // Apply a filter
    await user.click(screen.getByText(/High Priority/i));
    
    // Check filter count badge
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('resets all filters', async () => {
    const user = userEvent.setup();
    render(<FilterBar />, { wrapper: TestWrapper });
    
    // Apply some filters
    const searchInput = screen.getByPlaceholderText(/Search tasks/i);
    await user.type(searchInput, 'test');
    
    await user.click(screen.getByText(/Filters/i));
    await user.click(screen.getByText(/High Priority/i));
    
    // Reset filters
    await user.click(screen.getByText(/Clear All/i));
    
    expect(searchInput).toHaveValue('');
  });
});

describe('Filter Accessibility', () => {
  test('has proper ARIA labels', () => {
    render(<FilterBar />, { wrapper: TestWrapper });
    
    expect(screen.getByLabelText(/Search tasks/i)).toBeInTheDocument();
  });

  test('filter buttons have proper aria-pressed states', async () => {
    const user = userEvent.setup();
    render(<FilterBar />, { wrapper: TestWrapper });
    
    await user.click(screen.getByText(/Filters/i));
    
    const priorityButton = screen.getByText(/High Priority/i);
    expect(priorityButton).toHaveAttribute('aria-pressed', 'false');
    
    await user.click(priorityButton);
    expect(priorityButton).toHaveAttribute('aria-pressed', 'true');
  });
});
