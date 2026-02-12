const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// Connect to MongoDB
connectDB();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Routes
app.use('/', authRoutes);
app.use('/tasks', taskRoutes);

// Root route - redirect to dashboard if logged in, else to login
app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/tasks');
  } else {
    res.redirect('/login');
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
