import { render, screen } from '@testing-library/react';
import App from './App';

test('renders task manager title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Task Manager/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders add new task button', () => {
  render(<App />);
  const addButton = screen.getByText(/Add New Task/i);
  expect(addButton).toBeInTheDocument();
});

test('renders filter section', () => {
  render(<App />);
  const filterButton = screen.getByText(/Filters/i);
  expect(filterButton).toBeInTheDocument();
});
