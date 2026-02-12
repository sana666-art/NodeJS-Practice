const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Apply auth middleware to all task routes
router.use(auth);

// GET /tasks - Show all tasks for the user
router.get('/', async (req, res) => {
  try {
    const { search, category, priority, completed } = req.query;

    let query = { user: req.session.userId };

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (priority && priority !== 'all') {
      query.priority = priority;
    }

    if (completed !== undefined && completed !== 'all') {
      query.completed = completed === 'true';
    }

    const tasks = await Task.find(query).sort({ order: 1, createdAt: -1 });

    // Calculate progress
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    res.render('tasks/index', {
      title: 'My Tasks',
      tasks,
      search: search || '',
      category: category || 'all',
      priority: priority || 'all',
      completed: completed || 'all',
      progress,
      user: { username: req.session.username }
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error loading tasks' });
  }
});

// GET /tasks/new - Show form to create new task
router.get('/new', (req, res) => {
  res.render('tasks/add', {
    title: 'Add New Task',
    task: {},
    errors: [],
    user: { username: req.session.username }
  });
});

// POST /tasks - Create new task
router.post('/', async (req, res) => {
  try {
    const { title, description, category, dueDate, priority } = req.body;

    // Get the highest order number for this user
    const lastTask = await Task.findOne({ user: req.session.userId }).sort({ order: -1 });
    const order = lastTask ? lastTask.order + 1 : 0;

    const task = new Task({
      title,
      description,
      category,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority,
      order,
      user: req.session.userId
    });

    await task.save();
    res.redirect('/tasks');
  } catch (error) {
    console.error(error);
    res.render('tasks/add', {
      title: 'Add New Task',
      task: req.body,
      errors: [{ msg: 'Error creating task' }],
      user: { username: req.session.username }
    });
  }
});

// GET /tasks/:id/edit - Show form to edit task
router.get('/:id/edit', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.session.userId });
    if (!task) {
      return res.status(404).render('error', { message: 'Task not found' });
    }

    res.render('tasks/edit', {
      title: 'Edit Task',
      task,
      errors: [],
      user: { username: req.session.username }
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error loading task' });
  }
});

// PUT /tasks/:id - Update task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, dueDate, priority, completed } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.session.userId },
      {
        title,
        description,
        category,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        completed: completed === 'on',
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).render('error', { message: 'Task not found' });
    }

    res.redirect('/tasks');
  } catch (error) {
    console.error(error);
    const task = await Task.findOne({ _id: req.params.id, user: req.session.userId });
    res.render('tasks/edit', {
      title: 'Edit Task',
      task: task || req.body,
      errors: [{ msg: 'Error updating task' }],
      user: { username: req.session.username }
    });
  }
});

// DELETE /tasks/:id - Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.session.userId });
    if (!task) {
      return res.status(404).render('error', { message: 'Task not found' });
    }
    res.redirect('/tasks');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error deleting task' });
  }
});

// POST /tasks/:id/toggle - Toggle task completion
router.post('/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.session.userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.completed = !task.completed;
    await task.save();

    res.json({ success: true, completed: task.completed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error toggling task' });
  }
});

// POST /tasks/reorder - Update task order for drag-and-drop
router.post('/reorder', async (req, res) => {
  try {
    const { taskIds } = req.body;

    for (let i = 0; i < taskIds.length; i++) {
      await Task.findOneAndUpdate(
        { _id: taskIds[i], user: req.session.userId },
        { order: i }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error reordering tasks' });
  }
});

// GET /tasks/export/:format - Export tasks
router.get('/export/:format', async (req, res) => {
  try {
    const { format } = req.params;
    const tasks = await Task.find({ user: req.session.userId }).sort({ order: 1 });

    if (format === 'csv') {
      const createCsvWriter = require('csv-writer').createObjectCsvWriter;
      const csvWriter = createCsvWriter({
        path: 'temp.csv',
        header: [
          { id: 'title', title: 'Title' },
          { id: 'description', title: 'Description' },
          { id: 'category', title: 'Category' },
          { id: 'priority', title: 'Priority' },
          { id: 'completed', title: 'Completed' },
          { id: 'dueDate', title: 'Due Date' }
        ]
      });

      await csvWriter.writeRecords(tasks.map(task => ({
        title: task.title,
        description: task.description,
        category: task.category,
        priority: task.priority,
        completed: task.completed ? 'Yes' : 'No',
        dueDate: task.dueDate ? task.dueDate.toDateString() : ''
      })));

      res.download('temp.csv', 'tasks.csv', (err) => {
        if (err) console.error(err);
        // Clean up temp file
        require('fs').unlinkSync('temp.csv');
      });
    } else if (format === 'pdf') {
      const PDFDocument = require('pdfkit');
      const doc = new PDFDocument();

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=tasks.pdf');

      doc.pipe(res);
      doc.fontSize(20).text('My Tasks', { align: 'center' });
      doc.moveDown();

      tasks.forEach(task => {
        doc.fontSize(14).text(`Title: ${task.title}`);
        doc.fontSize(12).text(`Description: ${task.description || 'N/A'}`);
        doc.text(`Category: ${task.category}`);
        doc.text(`Priority: ${task.priority}`);
        doc.text(`Completed: ${task.completed ? 'Yes' : 'No'}`);
        doc.text(`Due Date: ${task.dueDate ? task.dueDate.toDateString() : 'N/A'}`);
        doc.moveDown();
      });

      doc.end();
    } else {
      res.status(400).render('error', { message: 'Invalid export format' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error exporting tasks' });
  }
});

module.exports = router;
