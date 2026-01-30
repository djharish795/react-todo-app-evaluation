import React, { useState, useEffect } from 'react';
import { getTasks, createTask } from '../../services/authService';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import Loader from '../Layout/Loader';
import '../../styles/tasks.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: ''
  });

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const cleanFilters = {};
      if (filters.status) cleanFilters.status = filters.status;
      if (filters.priority) cleanFilters.priority = filters.priority;
      if (filters.search) cleanFilters.search = filters.search;
      
      const data = await getTasks(cleanFilters);
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([newTask, ...tasks]);
      setShowForm(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
      throw err;
    }
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading && tasks.length === 0) {
    return <Loader />;
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>My Tasks</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : '+ New Task'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="task-form-container">
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <TaskFilter filters={filters} onFilterChange={handleFilterChange} />

      {loading ? (
        <Loader />
      ) : tasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks found. Create your first task to get started!</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
