const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskController');

// Apply auth middleware to all task routes
router.use(auth);

// GET /tasks - Show all tasks for the user
router.get('/', taskController.getAllTasks);

// GET /tasks/new - Show form to create new task
router.get('/new', taskController.getNewTaskForm);

// POST /tasks - Create new task
router.post('/', taskController.createTask);

// GET /tasks/:id/edit - Show form to edit task
router.get('/:id/edit', taskController.getEditTaskForm);

// PUT /tasks/:id - Update task
router.put('/:id', taskController.updateTask);

// DELETE /tasks/:id - Delete task
router.delete('/:id', taskController.deleteTask);

// POST /tasks/:id/toggle - Toggle task completion
router.post('/:id/toggle', taskController.toggleTask);

// POST /tasks/reorder - Update task order for drag-and-drop
router.post('/reorder', taskController.reorderTasks);

// GET /tasks/export/:format - Export tasks
router.get('/export/:format', taskController.exportTasks);

module.exports = router;
