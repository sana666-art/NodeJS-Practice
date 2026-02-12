const express = require('express');
const mongoodb = require('mongodb');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('this is a MongoDB tutorial');
});

// MongoDB connection URI and client setup
    //MongoClient is a class provided by the MongoDB Node.js driver that allows you to connect to a MongoDB database and perform operations on it. You can create an instance of MongoClient and use it to connect to your MongoDB server, then perform various database operations such as inserting, querying, updating, and deleting documents. It take the connection URI as an argument, which specifies the location of the MongoDB server and any necessary authentication details. Once connected, you can use the client to interact with your MongoDB database.

// const connectionURI = 'mongodb://localhost:27017';
// const client = new mongoodb.MongoClient(connectionURI);

// client.connect().then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Failed to connect to MongoDB', err);
// });

// const db = client.db('SchoolDB');

// const student = db.collection('students')

                        //1. How to add data in the Database.

// Insert a student document into the 'students' collection (Single document insertion)
// The insertOne() method is used to insert a single document into a MongoDB collection. It takes an object representing the document to be inserted as an argument and returns a promise that resolves to the result of the insertion operation. 
// Row --> document
// app.post('/students', (req, res, next) => {
//     console.log('Inserting student into MongoDB');
//   student.insertOne({
//     name: 'Dude Mike',
//     email: 'dudemike123@gmail.com',
//     department: 'Software Engineering',
//     age: 19,
//   }).then(result => {
//     res.status(201).send('Student inserted successfully');
//     res.send(result);
//   }).catch(err => {
//     console.error('Failed to insert student', err);
//     res.status(500).send(err.message);
//   });
// });

//how to insert multiple documents into a MongoDB collection using the insertMany() method in Node.js
//app.use(express.json()); // Middleware to parse JSON request bodies

// app.post('/students', (req, res, next) => {
//   const { name, email, department, age } = req.body;
//   student.insertOne({
//     name: name,
//     email: email,
//     department: department,
//     age: age,
//   }).then(result => {
//     res.status(201).send('Student inserted successfully');
//     res.send(result);
//   }).catch(err => {
//     console.error('Failed to insert student', err);
//     res.status(500).send(err.message);
//   });
// });

// The insertMany() method is used to insert multiple documents into a MongoDB collection. It takes an array of objects representing the documents to be inserted as an argument and returns a promise that resolves to the result of the insertion operation. Each object in the array represents a document that will be inserted into the collection.
// app.post('/students', (req, res, next) => {
//     // console.log(req.body);
//     // res.send('Received student data');
// //   const { name, email, department, age } = req.body;
// const students = req.body;
//   student.insertMany(students).then(result => {
//     res.status(201).send('Students inserted successfully');
//     res.send(result);
//   }).catch(err => {
//     console.error('Failed to insert student', err);
//     res.status(500).send(err.message);
//   });
// });

                    //2. How to read or get data from the Database

//How to find single document in the MongoDB collection using the findOne() method in Node.js
//Get Student
// app.get('/students', (req, res, next) => {
// //   const { email } = req.query;
//     const email = req.query.email;
//   student.findOne({ email: email }).then(result => {
//     if (result) {
//       res.status(200).json(result);
//     } else {
//       res.status(404).send('Student not found');
//     }
//     }).catch(err => {
//         console.error('Failed to find student', err);
//         res.status(500).send(err.message);
//     });
// });

//How to find multiple documents in the MongoDB collection using the find() method in Node.js
// app.get('/students', (req, res, next) => {

//   const { age } = req.query;
//   student.find({ age: age }).toArray().then(result => {
//     if (result) {
//       res.status(200).json(result);
//     } else {
//       res.status(404).send('Student not found');
//     }
//     }).catch(err => {
//         console.error('Failed to find student', err);
//         res.status(500).send(err.message);
//     });
// });

                    //3. How to update data in the Database

//How to update a single document in the MongoDB collection using the updateOne() method in Node.js

//$set is a keyword used in MongoDB update operations to specify the fields that should be updated and their new values. When you use $set in an update operation, it allows you to modify specific fields of a document without affecting the other fields.

// app.put('/students', (req, res, next) => {
//   const { email } = req.query;
//   const { name, department, age } = req.body;
//     student.findOneAndUpdate({ email: email }, { $set: { name: name, department: department, age: age } }, { returnDocument: "after"}).then(result => {
//     if (result) {
//       res.status(200).json({ message: 'Student updated successfully', updatedStudent: result.value });
//     } else {
//       res.status(404).json({ message: 'Student not found' });
//     }
//     }).catch(err => {
//         console.error('Failed to update student', err);
//         res.status(500).json({ message: err.message });
//     });
// });

//How to update multiple documents in the MongoDB collection using the updateMany() method in Node.js
// app.put('/students', (req, res, next) => {
//   const { age } = req.query;
//   const { name, department, email} = req.body;
//     student.updateMany({ age: age }, { $set: { name: name, department: department, email: email } }, { returnDocument: "after"}).then(result => {
//     if (result) {
//       console.log(result);
//       res.status(200).json(
//         { 
//             message: 'Students updated successfully',
//             updateStudents: result
//         });
//     } else {
//       res.status(404).json({ message: 'Students not found' });
//     }
//     }).catch(err => {
//         console.error('Failed to update students data', err);
//         res.status(500).json({ message: err.message });
//     });
// });


                    //4. How to delete data from the Database

//How to delete a single document from the MongoDB collection using the deleteOne() method in Node.js
// app.delete('/students', (req, res, next) => {
//   const { email } = req.query;
//     student.deleteOne({ email: email }).then(result => {
//     if (result.deletedCount > 0) {
//       res.status(200).json({ message: 'Student deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Student not found' });
//     }
//     }).catch(err => {
//         console.error('Failed to delete student', err);
//         res.status(500).json({ message: err.message });
//     });
// });

//How to delete multiple documents from the MongoDB collection using the deleteMany() method in Node.js
// app.delete('/students', (req, res, next) => {
//   const { email } = req.query;
//     student.deleteMany({ email:email }).then(result => {
//     if (result.deletedCount > 0) {
//       res.status(200).json({ message: 'Students deleted successfully', deletedStudents: result });
//     } else {
//       res.status(404).json({ message: 'Students not found' });
//     }
//     }).catch(err => {
//         console.error('Failed to delete students', err);
//         res.status(500).json({ message: err.message });
//     });
// });

// const errorMiddleware = (err, req, res, next) => {
//   res.status(500).send(err.message);
// }

// app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});