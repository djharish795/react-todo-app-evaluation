import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskProvider } from '../context/TaskContext';
import Home from '../pages/Home';

// Mock component wrapper
const TestWrapper = ({ children }) => (
  <TaskProvider>
    {children}
  </TaskProvider>
);

// Helper function to render components with context
const renderWithContext = (component) => {
  return render(component, { wrapper: TestWrapper });
};

describe('Home Page', () => {
  test('renders main heading', () => {
    renderWithContext(<Home />);
    expect(screen.getByText(/Task Manager/i)).toBeInTheDocument();
  });

  test('shows add task button', () => {
    renderWithContext(<Home />);
    expect(screen.getByText(/Add New Task/i)).toBeInTheDocument();
  });

  test('opens add task form when button is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext(<Home />);
    
    const addButton = screen.getByText(/Add New Task/i);
    await user.click(addButton);
    
    expect(screen.getByText(/Create New Task/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
  });

  test('creates a new task', async () => {
    const user = userEvent.setup();
    renderWithContext(<Home />);
    
    // Open form
    await user.click(screen.getByText(/Add New Task/i));
    
    // Fill form
    await user.type(screen.getByLabelText(/Title/i), 'Test Task');
    await user.type(screen.getByLabelText(/Description/i), 'Test Description');
    
    // Submit form
    await user.click(screen.getByText(/Create Task/i));
    
    // Check if task appears
    await waitFor(() => {
      expect(screen.getByText('Test Task')).toBeInTheDocument();
    });
  });

  test('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithContext(<Home />);
    
    // Open form and try to submit without title
    await user.click(screen.getByText(/Add New Task/i));
    await user.click(screen.getByText(/Create Task/i));
    
    // Check for validation message
    expect(screen.getByText(/Task title is required/i)).toBeInTheDocument();
  });

  test('filters tasks correctly', async () => {
    const user = userEvent.setup();
    renderWithContext(<Home />);
    
    // Add some tasks first
    await user.click(screen.getByText(/Add New Task/i));
    await user.type(screen.getByLabelText(/Title/i), 'Completed Task');
    await user.click(screen.getByText(/Create Task/i));
    
    await waitFor(() => {
      expect(screen.getByText('Completed Task')).toBeInTheDocument();
    });
    
    // Mark task as completed
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    
    // Filter by completed
    await user.click(screen.getByText(/Filters/i));
    await user.click(screen.getByText(/Completed/i));
    
    expect(screen.getByText('Completed Task')).toBeInTheDocument();
  });
});

describe('Task Statistics', () => {
  test('displays correct task counts', () => {
    renderWithContext(<Home />);
    
    // Check that statistics are displayed
    expect(screen.getByText(/Total Tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });
});

describe('Accessibility', () => {
  test('has proper heading structure', () => {
    renderWithContext(<Home />);
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent(/Task Manager/i);
  });

  test('has accessible form labels', async () => {
    const user = userEvent.setup();
    renderWithContext(<Home />);
    
    await user.click(screen.getByText(/Add New Task/i));
    
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  test('has keyboard navigation support', async () => {
    renderWithContext(<Home />);
    
    const addButton = screen.getByText(/Add New Task/i);
    addButton.focus();
    
    expect(document.activeElement).toBe(addButton);
  });
});
