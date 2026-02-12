// Dark Mode Toggle
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateDarkModeIcon(true);
  }

  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateDarkModeIcon(isDark);
  });
}

function updateDarkModeIcon(isDark) {
  const icon = document.querySelector('#darkModeToggle i');
  if (isDark) {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Drag and Drop Functionality
function initDragAndDrop() {
  const taskList = document.getElementById('taskList');
  if (!taskList) return;

  // Initialize SortableJS
  Sortable.create(taskList, {
    handle: '.task-card',
    animation: 150,
    ghostClass: 'sortable-ghost',
    onEnd: function(evt) {
      const taskIds = Array.from(taskList.children).map(card => card.dataset.id);
      updateTaskOrder(taskIds);
    }
  });
}

async function updateTaskOrder(taskIds) {
  try {
    const response = await fetch('/tasks/reorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskIds })
    });

    if (!response.ok) {
      throw new Error('Failed to update task order');
    }

    console.log('Task order updated successfully');
  } catch (error) {
    console.error('Error updating task order:', error);
    // Reload the page to restore original order
    location.reload();
  }
}

// Task Toggle Functionality
async function toggleTask(taskId, completed) {
  try {
    const response = await fetch(`/tasks/${taskId}/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed })
    });

    if (!response.ok) {
      throw new Error('Failed to toggle task');
    }

    const data = await response.json();

    // Update UI
    const taskCard = document.querySelector(`[data-id="${taskId}"]`);
    const taskTitle = taskCard.querySelector('.task-title');
    const checkbox = taskCard.querySelector('input[type="checkbox"]');

    taskCard.classList.toggle('completed', data.completed);
    taskTitle.classList.toggle('strikethrough', data.completed);
    checkbox.checked = data.completed;

    // Update progress bar
    updateProgressBar();

  } catch (error) {
    console.error('Error toggling task:', error);
    // Reload to sync state
    location.reload();
  }
}

function updateProgressBar() {
  const progressFill = document.getElementById('progressFill');
  if (!progressFill) return;

  // This would need to be updated with actual progress data
  // For now, we'll just trigger a visual update
  progressFill.style.width = progressFill.style.width;
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!validateForm(this)) {
        e.preventDefault();
      }
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      showFieldError(field, 'This field is required');
      isValid = false;
    } else {
      clearFieldError(field);
    }
  });

  // Email validation
  const emailFields = form.querySelectorAll('input[type="email"]');
  emailFields.forEach(field => {
    if (field.value && !isValidEmail(field.value)) {
      showFieldError(field, 'Please enter a valid email address');
      isValid = false;
    }
  });

  // Password confirmation
  const password = form.querySelector('input[name="password"]');
  const confirmPassword = form.querySelector('input[name="confirmPassword"]');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    showFieldError(confirmPassword, 'Passwords do not match');
    isValid = false;
  }

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFieldError(field, message) {
  clearFieldError(field);

  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  errorDiv.style.color = 'var(--danger-color)';
  errorDiv.style.fontSize = '0.75rem';
  errorDiv.style.marginTop = '0.25rem';

  field.parentNode.appendChild(errorDiv);
  field.style.borderColor = 'var(--danger-color)';
}

function clearFieldError(field) {
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  field.style.borderColor = 'var(--border-color)';
}

// Dropdown functionality
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.export-dropdown');

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      menu.style.display = 'none';
    });
  });
}

// Notification System
function initNotifications() {
  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  // Check for due tasks and show notifications
  checkDueTasks();
}

async function checkDueTasks() {
  try {
    const response = await fetch('/tasks?completed=false');
    const html = await response.text();

    // Parse the HTML to find due tasks (this is a simple approach)
    // In a real app, you'd have a dedicated API endpoint
    const dueTasksMatch = html.match(/dueTasksCount[^>]*>(\d+)/);
    const dueTasksCount = dueTasksMatch ? parseInt(dueTasksMatch[1]) : 0;

    if (dueTasksCount > 0 && Notification.permission === 'granted') {
      new Notification('Task Reminder', {
        body: `You have ${dueTasksCount} task${dueTasksCount > 1 ? 's' : ''} due today or overdue!`,
        icon: '/favicon.ico',
        tag: 'due-tasks'
      });
    }
  } catch (error) {
    console.error('Error checking due tasks:', error);
  }
}

// Reminder function that can be called periodically
function scheduleReminders() {
  // Check every hour for due tasks
  setInterval(checkDueTasks, 60 * 60 * 1000); // 1 hour
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();
  initDragAndDrop();
  initFormValidation();
  initDropdowns();
  initNotifications();
  scheduleReminders();
});

// Utility functions
function showAlert(message, type = 'info') {
  // Create alert element
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  // Insert at top of main content
  const mainContent = document.querySelector('.main-content');
  mainContent.insertBefore(alert, mainContent.firstChild);

  // Auto remove after 5 seconds
  setTimeout(() => {
    alert.remove();
  }, 5000);
}

// Confirm dialog helper
function confirmAction(message) {
  return confirm(message);
}
