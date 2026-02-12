# To-Do List Web Application

A modern, full-stack To-Do list application built with Node.js, Express.js, MongoDB, and EJS.

## Features

- User authentication (register, login, logout)
- Task management (create, read, update, delete)
- Task categories, priorities, and due dates
- Search and filter functionality
- Dark mode toggle
- Drag-and-drop task reordering
- Export tasks to PDF or CSV
- Responsive design for mobile and desktop
- Secure session management

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS templating, CSS, JavaScript
- **Authentication**: bcryptjs, express-session
- **Other**: Multer, PDFKit, CSV-Writer, SortableJS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd TO-DO App
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

   ```
   MONGO_URI=mongodb://localhost:27017/todoapp
   SESSION_SECRET=your-secret-key-here
   ```

4. Start MongoDB service (if using local MongoDB):

   ```bash
   # On Windows (run as Administrator)
   net start MongoDB
   ```

5. Start the application:

   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Usage

### User Registration and Login

- Visit the homepage and click "Sign Up" to create a new account
- Use your credentials to log in
- Access your personal dashboard

### Managing Tasks

- **Add Task**: Click "Add Task" to create new tasks
- **Edit Task**: Click the edit icon on any task
- **Delete Task**: Click the delete icon on any task
- **Mark Complete**: Check the checkbox to mark tasks as complete
- **Reorder Tasks**: Drag and drop tasks to reorder them

### Search and Filter

- Use the search bar to find tasks by title
- Filter by category, priority, or completion status

### Export

- Click "Export" to download tasks as PDF or CSV

### Dark Mode

- Toggle dark mode using the moon icon in the navigation

## Project Structure

```
TO-DO App/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── User.js              # User schema
│   └── Task.js              # Task schema
├── public/
│   ├── css/
│   │   └── styles.css       # Application styles
│   └── js/
│       └── app.js           # Client-side JavaScript
├── routes/
│   ├── auth.js              # Authentication routes
│   └── tasks.js             # Task management routes
├── views/
│   ├── layout.ejs           # Base template
│   ├── login.ejs            # Login page
│   ├── signup.ejs           # Signup page
│   ├── error.ejs            # Error page
│   └── tasks/
│       ├── index.ejs        # Task list
│       ├── add.ejs          # Add task form
│       └── edit.ejs         # Edit task form
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
├── server.js                # Main application file
└── README.md                # This file
```

## API Endpoints

### Authentication

- `GET /` - Redirect to login or dashboard
- `GET /login` - Login page
- `POST /login` - Login user
- `GET /signup` - Signup page
- `POST /signup` - Register user
- `POST /logout` - Logout user

### Tasks

- `GET /tasks` - Dashboard with task list
- `GET /tasks/new` - Add new task form
- `POST /tasks` - Create new task
- `GET /tasks/:id/edit` - Edit task form
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `GET /tasks/search` - Search tasks
- `GET /tasks/export/pdf` - Export tasks as PDF
- `GET /tasks/export/csv` - Export tasks as CSV

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Built with Node.js and Express.js
- Uses MongoDB for data storage
- Font Awesome for icons
- SortableJS for drag-and-drop functionality
