const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  category: {
    type: String,
    required: true,
    enum: ['Work', 'Personal', 'Shopping', 'Health', 'Education', 'Other'],
    default: 'Other'
  },
  dueDate: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  completed: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient querying
taskSchema.index({ user: 1, completed: 1, dueDate: 1 });
taskSchema.index({ user: 1, order: 1 });

module.exports = mongoose.model('Task', taskSchema);
