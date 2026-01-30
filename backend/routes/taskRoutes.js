const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { taskValidation } = require('../utils/validator');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getTasks)
  .post(protect, taskValidation, createTask);

router.route('/:id')
  .get(protect, getTaskById)
  .put(protect, taskValidation, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
