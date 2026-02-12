const fs = require("fs");

//Asynchronous way
console.log("Asynchronous way: ");
fs.writeFileSync("test.txt", "Hello Node!");
fs.appendFileSync("test.txt", "\nWelcome to Node.js!");

const data = fs.readFileSync("test.txt");
console.log(data);
console.log("Using tostring() function: ",data.toString());

const data1 = fs.readFileSync("test.txt", "utf-8");
console.log("Using utf-8: ",data1);

// fs.renameSync("test.txt", "greeting.txt");
// fs.unlinkSync("greeting.txt");

//non-blocking way
console.log("Non-blocking way: ");
fs.writeFile("test.txt", "Hello Node!", (err) => {
    if (err) throw err;
    console.log("File created successfully!");
    fs.appendFile("test.txt", "\nWelcome to Node.js!", (err) => {
        if (err) throw err;
        console.log("Data appended successfully!");
        fs.readFile("test.txt", "utf-8", (err, data) => {
            if (err) throw err;
            console.log("File content: ", data);
        });
    });
});

// fs.rename("test.txt", "greeting.txt");
// fs.unlink("greeting.txt");