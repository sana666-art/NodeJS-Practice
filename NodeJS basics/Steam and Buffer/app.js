const fs = require('fs');
// const path = require('path');

                    // READABLE STREAMS
let readStream = fs.createReadStream('data.txt');
// readStream.on('data', function(Buffer) {
//     console.log('Data', Buffer.toString());
// })

// // Create a readable stream from a file
// const filePath = path.join(__dirname, 'data.txt');
// const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });

// // Listen for data events
// readableStream.on('data', (chunk) => {
//     console.log('Received chunk:', chunk);
// });
// // Listen for end event
// readableStream.on('end', () => {
//     console.log('No more data to read.');
// });
// // Listen for error events
// readableStream.on('error', (err) => {
//     console.error('Error reading file:', err);
// });

// // Create a readable stream from a string
// const stringData = 'Hello, this is a readable stream from a string!';
// const stringStream = Readable.from(stringData);
// // Listen for data events
// stringStream.on('data', (chunk) => {
//     console.log('Received chunk from string:', chunk);
// });
// // Listen for end event
// stringStream.on('end', () => {
//     console.log('No more data to read from string stream.');
// });
// // Listen for error events
// stringStream.on('error', (err) => {
//     console.error('Error reading from string stream:', err);
// });

// let readStream = fs.createReadStream('data.txt')
// let content = []

// readStream.on('data', function(Buffer) {
//     content.push(Buffer)
// })

// readStream.on('end', function() {
//     let data = Buffer.concat(content).toString();
//     console.log('Data', data);
// })

// readStream.on('error', function(err) {
//     console.error('Error reading file:', err);
// })


                    // WRITABLE STREAMS
let writeStream = fs.createWriteStream('output.txt')
// writeStream.write('Hello, this is a writable stream!\n');
// writeStream.write('This is another line of text.\n');

// readStream.on('data', function(Buffer) {
//     writeStream.write(Buffer)
// })

// readStream.on('end', function() {
//     writeStream.end('This is the end of the stream.');
// });

// writeStream.on('finish', function() {
//     console.log('All data has been written to the file.');
// })

// writeStream.on('error', function(err) {
//     console.error('Error writing to file:', err);
// })

readStream.pipe(writeStream);

