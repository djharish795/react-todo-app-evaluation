import React, { useState } from 'react';
import { deleteTask, updateTask } from '../../services/authService';
import '../../styles/tasks.css';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);
  const [loading, setLoading] = useState(false);

  const handleStatusToggle = async () => {
    setLoading(true);
    try {
      const updatedTask = await updateTask(task._id, {
        ...task,
        status: task.status === 'pending' ? 'completed' : 'pending'
      });
      onUpdate(updatedTask);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await deleteTask(task._id);
        onDelete(task._id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedTask = await updateTask(task._id, editData);
      onUpdate(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData(task);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="task-edit-form">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="edit-input"
            placeholder="Task title"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="edit-textarea"
            placeholder="Task description"
            rows="2"
          />
          <div className="edit-selects">
            <select
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
              className="edit-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              value={editData.status}
              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
              className="edit-select"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="date"
              value={editData.dueDate ? editData.dueDate.split('T')[0] : ''}
              onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
              className="edit-date"
            />
          </div>
          <div className="edit-actions">
            <button onClick={handleSave} disabled={loading} className="btn btn-sm btn-primary">
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={handleCancel} disabled={loading} className="btn btn-sm btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.status} priority-${task.priority}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={handleStatusToggle}
          disabled={loading}
        />
      </div>
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
        <div className="task-meta">
          <span className={`task-priority priority-${task.priority}`}>
            {task.priority.toUpperCase()}
          </span>
          <span className={`task-status status-${task.status}`}>
            {task.status.toUpperCase()}
          </span>
          <span className="task-due-date">{formatDate(task.dueDate)}</span>
        </div>
      </div>
      <div className="task-actions">
        <button
          onClick={handleEdit}
          disabled={loading}
          className="btn btn-sm btn-edit"
          title="Edit task"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="btn btn-sm btn-delete"
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
