const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// GET /login - Show login form
router.get('/login', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/tasks');
  }
  res.render('login', {
    title: 'Login',
    errors: [],
    formData: {}
  });
});

// POST /login - Authenticate user
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('login', {
      title: 'Login',
      errors: errors.array(),
      formData: req.body
    });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.render('login', {
        title: 'Login',
        errors: [{ msg: 'Invalid email or password' }],
        formData: req.body
      });
    }

    req.session.userId = user._id;
    req.session.username = user.username;
    res.redirect('/tasks');
  } catch (error) {
    console.error(error);
    res.render('login', {
      title: 'Login',
      errors: [{ msg: 'An error occurred. Please try again.' }],
      formData: req.body
    });
  }
});

// GET /signup - Show signup form
router.get('/signup', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/tasks');
  }
  res.render('signup', {
    title: 'Sign Up',
    errors: [],
    formData: {}
  });
});

// POST /signup - Create new user
router.post('/signup', [
  body('username').isLength({ min: 3, max: 50 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('signup', {
      title: 'Sign Up',
      errors: errors.array(),
      formData: req.body
    });
  }

  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.render('signup', {
        title: 'Sign Up',
        errors: [{ msg: 'User with this email or username already exists' }],
        formData: req.body
      });
    }

    const user = new User({ username, email, password });
    await user.save();

    req.session.userId = user._id;
    req.session.username = user.username;
    res.redirect('/tasks');
  } catch (error) {
    console.error(error);
    res.render('signup', {
      title: 'Sign Up',
      errors: [{ msg: 'An error occurred. Please try again.' }],
      formData: req.body
    });
  }
});

// POST /logout - Logout user
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
    }
    res.redirect('/login');
  });
});

module.exports = router;
