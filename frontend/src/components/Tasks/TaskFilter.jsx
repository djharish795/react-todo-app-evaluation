import React from 'react';
import '../../styles/tasks.css';

const TaskFilter = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    onFilterChange({
      status: '',
      priority: '',
      search: ''
    });
  };

  return (
    <div className="task-filter">
      <div className="filter-group">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search tasks..."
          className="filter-search"
        />
      </div>
      
      <div className="filter-group">
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      <div className="filter-group">
        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      {(filters.status || filters.priority || filters.search) && (
        <button onClick={handleReset} className="btn btn-secondary">
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default TaskFilter;
