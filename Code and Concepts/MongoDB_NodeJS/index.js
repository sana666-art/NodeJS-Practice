// Topics covered in this MongoDB and Node.js tutorial:
// 1. Setting up an Express.js server
// 2. Connecting to MongoDB using Mongoose
// 3. Defining a Mongoose schema and model for Student
// 4. Middleware for parsing JSON requests
// 5. Creating students (single and multiple)
// 6. Reading students (by ID, by email, multiple with filters)
// 7. Updating students (single and multiple)
// 8. Deleting students (by ID, by email, multiple by IDs)
// 9. Error handling middleware
// 10. Starting the server

// Detailed explanations:
// 1. Setting up an Express.js server: Creating an Express app instance, defining port, and setting up basic routes like the root endpoint.
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('this is a MongoDB tutorial');
});

// 4. Middleware for parsing JSON requests: Using express.json() to parse incoming JSON payloads in request bodies.
app.use(express.json());

// 2. Connecting to MongoDB using Mongoose: Establishing a connection to a local MongoDB database using Mongoose ODM.
const connectionURL = 'mongodb://localhost:27017/schoolDB';

mongoose.connect(connectionURL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

// 3. Defining a Mongoose schema and model for Student: Creating a schema with fields (name, age, email, department) and registering it as a model.
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    department: String,
});

const Student = mongoose.model('students', studentSchema);

// 5. Creating students (single and multiple): Implementing POST endpoints to add one or multiple student documents to the database.
app.post('/student/single', async (req, res, next) => {
    try {
        const { name, age, email, department } = req.body;

        if (!name || !age || !email || !department) {
            return res.status(400).json({ error: 'All fields (name, age, email, department) are required' });
        }

        const newStudent = new Student({ name, age, email, department });
        await newStudent.save();

        res.status(201).json({ message: 'Student added successfully', student: newStudent });
    } catch (error) {
        next(error);
    }
});

app.post('/student/multiple', async (req, res, next) => {
    try {
        const students = req.body;

        if (!Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ error: 'Request body must be a non-empty array of students' });
        }
        for (const student of students) {
            if (!student.name || !student.age || !student.email || !student.department) {
                return res.status(400).json({ error: 'Each student must have name, age, email, and department' });
            }
        }

        const newStudents = await Student.insertMany(students);

        res.status(201).json({ message: 'Students added successfully', students: newStudents });
    } catch (error) {
        next(error);
    }
});

// 7. Updating students (single and multiple): Implementing PUT endpoints to update one or multiple student documents in the database.
app.put('/student/single/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student updated successfully', student: updatedStudent });
    } catch (error) {
        next(error);
    }
});



app.put('/student/multiple', async (req, res, next) => {
    try {
        const updates = req.body;
        if (!Array.isArray(updates) || updates.length === 0) {
            return res.status(400).json({ error: 'Request body must be a non-empty array of updates' });
        }
        const updatedStudents = [];
        for (const update of updates) {
            const { id, ...fields } = update;
            const student = await Student.findByIdAndUpdate(id, fields, { new: true });

            if (!student) {
                return res.status(404).json({ error: `Student with id ${id} not found` });
            }

            updatedStudents.push(student);
        }
        res.json({ message: 'Students updated successfully', students: updatedStudents });
    } catch (error) {
        next(error);
    }
});

// 6. Reading students (by ID, by email, multiple with filters): Implementing GET endpoints to retrieve students by ID, email, or with query filters like department, age, name.
app.get('/student/single/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ student });
    } catch (error) {
        next(error);
    }
});

app.get('/student/single', async (req, res, next) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: 'Email query parameter is required' });
        }
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ student });
    } catch (error) {
        next(error);
    }
});

app.get('/student/multiple', async (req, res, next) => {
    try {
        const query = {};
        if (req.query.department) {
            query.department = req.query.department;
        }
        if (req.query.age) {
            query.age = Number(req.query.age);
        }
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: 'i' };
        }
        const students = await Student.find(query);
        res.json({ students });
    } catch (error) {
        next(error);
    }
});

// 8. Deleting students (by ID, by email, multiple by IDs): Implementing DELETE endpoints to remove students by ID, email, or multiple IDs.
app.delete('/student/single/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully', student: deletedStudent });
    } catch (error) {
        next(error);
    }
});

app.delete('/student/single', async (req, res, next) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: 'Email query parameter is required' });
        }
        const deletedStudent = await Student.findOneAndDelete({ email });
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully', student: deletedStudent });
    } catch (error) {
        next(error);
    }
});

app.delete('/student/multiple', async (req, res, next) => {
    try {
        const { ids } = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: 'Request body must be a non-empty array of IDs' });
        }
        const deletedStudents = await Student.deleteMany({ _id: { $in: ids } });
        res.json({ message: 'Students deleted successfully', deletedCount: deletedStudents.deletedCount });
    } catch (error) {
        next(error);
    }
});


// 9. Error handling middleware: Adding a global error handler to catch and respond to errors in a consistent way.
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
};

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});