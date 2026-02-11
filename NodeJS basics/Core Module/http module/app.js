const http = require("http");

// Create a server object
// The createServer() method creates an HTTP server that listens to server ports and gives a response back to the client.
// let server = http.createServer();

// server.on("connection", function(socket) {
//     console.log("New connection...");
// });

//listening to the server
// server.listen(3000, function() {
//     console.log("Server is running on port 3000");
// })

// let server = http.createServer(function(request, response) {
// //   console.log(request.url);
//     if (request.url === "/") {
//         response.write("Hello World");
//         response.end();
//     } else if (request.url === "/api/courses") {
//         response.write(JSON.stringify([1, 2, 3]));
//         response.end();
//     } else {
//         response.write("Page not found");
//         response.end();
//     }
// });

// server.on("connection", function(socket) {
//     console.log("New connection...");
// });

// server.listen(3000, function() {
//     console.log("Server is running on port 3000");
// })

let server = http.createServer(function(request, response) {

    if (request.url === "/") {
        response.write("<h1>This is the Home Page.</h1>");
        response.end();
    } else if (request.url === "/about") {
        response.write("<h1>This is the About Page.</h1>");
        response.end();
    } else if (request.url === "/contact") {
        response.write("<h1>This is the Contact Page.</h1>");
        response.end();
    } else {
        response.write("<h1>Page not found.</h1>");
        response.end();
    }
});

server.on("connection", function(socket) {
    console.log("New connection...");
});

server.listen(3000, function() {
    console.log("Server is running on port 3000");
})