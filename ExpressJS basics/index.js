// console.log("Welcome to the ExpressJS!");\

// ExpressJS is a web application framework for Node.js that provides a robust set of features for building web applications and APIs. It simplifies the process of handling HTTP requests and responses, routing, middleware, and more.

//I am going to cover the following topics in this ExpressJS tutorial:
// 1. Setting up an ExpressJS server
// 2. Request and Response Methods
// 3. Request Body Parsing
// 4. Params Object
// 5. Middleware for parsing request body
// 6. Query Strings
// 7. Sub Routes
// 8. Cookies
// 9. Request Object
// 10. Response Object
// 11. View Engine and HTML Response
// 12. Response formate
// 13. HTTP Status Codes
// 14. how to use middleware in ExpressJS
// 15. Errors Handling Middleware
// 16. Error Handling in ExpressJS

const express = require("express");

const app = express();

      // Middleware for parsing request body: ExpressJS provides built-in middleware functions to parse the request body. These middleware functions are used to handle different types of request bodies, such as JSON, URL-encoded data, text, and raw data. We can use these middleware functions to access the data sent by the client in the request body.

// app.use(express.json());
// app.use(express.text());
// app.use(express.raw());

            //Request Response Methods: ExpressJS provides various methods to handle HTTP requests and send responses. Some of the commonly used methods include: get, post, put, patch, delete, etc. These methods correspond to the HTTP methods and allow us to define routes for different types of requests.

app.get("/", (req, res) => {
   res.send("This is the home page");
});

// app.get("/example", (req, res, next) => {
//    res.send("This is the get method of example page");
// });

// app.post("/example", (req, res, next) => {
//    res.send("This is the post method of example page");
// });

// app.put("/example", (req, res, next) => {
//    res.send("This is the put method of example page");
// });

// app.patch("/example", (req, res, next) => {
//    res.send("This is the patch method of example page");
// });

// app.delete("/example", (req, res, next) => {
//    res.send("This is the delete method of example page");
// });


         // Request Body Parsing: When a client sends data to the server in the body of an HTTP request (e.g., in a POST or PUT request), we can access that data using the req.body property. However, to parse the request body, we need to use middleware.

// app.post("/example", (req, res, next) => {
//    let data = req.body;
//    console.log(data);
//    console.log(data.toString());
//    // console.log(data.name);
//    // console.log(data.email);

//    // let { name, email } = req.body;
//    // console.log(name, email);
//    // console.log(name);
//    // console.log(email);
//    res.send("This is the post method of example page");
// });

     // Params Object: We can define route parameters in our ExpressJS routes using the colon (:) syntax. These parameters are then accessible in the request object as req.params.

// app.get("/users", (req, res) => {
//    res.send("User List");
// });

// app.get("/users/:id", (req, res) => {
//    console.log(req.params);
//    // let id = req.params.id;
//    // console.log(id);
//    // res.send(`User with ID: ${id}`);
//    res.send(`User with ID: ${req.params.id}`);
// });

      // Query Strings: we can send additional data to the server in the form of query strings. Query strings are appended to the URL after a question mark (?) and are typically used to filter or sort data.
// app.get("/users/:userId", (req, res) => {
//    let { userId } = req.params;

//    let { name, email } = req.query;
//    console.log(name, email);
//    // console.log(req.query);
//    res.send(`User with ID: ${userId}`);
// });

      //Sub Routes: In ExpressJS, we can create sub-routes using the express.Router() function. This allows us to organize our routes into separate modules and keep our code clean and maintainable.

// const admin = express.Router();
// const student = express.Router();

// app.use("/admin", admin);
// app.use("/student", student);

// admin.get("/home", (req, res, next) => {
//    console.log(req.baseUrl);
//    console.log(req.originalUrl);
//    console.log(req.path);
//    res.send("Admin Home Page");
// });

// student.get("/home", (req, res, next) => {
//    console.log(req.baseUrl);
//    console.log(req.originalUrl);
//    console.log(req.path);
//    res.send("Student Home Page");
// });

// app.get("/home", (req, res, next) => {
//    console.log(req.baseUrl);
//    console.log(req.originalUrl);
//    console.log(req.path);
//    res.send("This is the common home page");
// });

      //Cookies: ExpressJS provides a convenient way to handle cookies using the res.cookie() method to set cookies and the req.cookies object to access cookies sent by the client. We can use cookies to store user preferences, session information, or any other data that needs to persist across multiple requests.

// const cookieParser = require("cookie-parser");

// app.use(cookieParser());

//how to read cookies sent by the client in the request

// app.get("/example", (req, res) => {
//    let cookies = req.cookies;
//    console.log(cookies);
//    res.send("This is the example route.");
// });

// how to set cookies in the response sent by the server to the client
// app.get("/setcookie", (req, res) => {
//    res.cookie("name", "Noman Traders");
//    res.cookie("age", "25");
//    res.cookie("email", "noman123@xyz.com");

//    res.clearCookie("age");
//    res.send("Cookies have been set");
// });

      //Request Object: The request object (req) in ExpressJS contains information about the incoming HTTP request, such as the request method, URL, headers, query parameters, and more. We can use the properties and methods of the request object to access and manipulate this information.

// app.get("/example", (req, res) => {
   // console.log(req.hostname);
   // console.log(req.method);
   // console.log(req.url);
   // console.log(req.headers);
   // console.log(req.query);
   // console.log(req.ip)
   // console.log(req.body)
   // console.log(req.protocol)
   // console.log(req.secure)
   // console.log(req.accepts())
   // console.log(req.get("User-Agent"))
   // console.log(req.subdomains)
   // console.log(req.get("content-type"))
   // res.send("This is the example route. Check the console for request object details.");
// });

      //Response Object: The response object (res) in ExpressJS is used to send a response back to the client. It provides various methods to set the status code, headers, and body of the response. We can use these methods to customize the response sent to the client based on the request.

// app.get("/test", (req, res) => {
//    res.send("This is the test route.");
// });   

//app.get("/example", (req, res) => {
   // res.status(200).send("This is the example route with status code 200");
   // res.status(404).send("This is the example route with status code 404");
   // res.status(500).send("This is the example route with status code 500");

   // res.set("Content-Type", "text/plain");
   // res.send("This is the example route with custom headers");

   // res.json({ 
   //    message: "This is the example route with JSON response", 
   //    namw: "Noman Traders" 
   // });

   // res.redirect("/test");
   // res.location("/test").send("This is the example route with location header and redirect to test route");

   // res.set("title", "ExpressJS Example");
   // const title = res.get("title");
   // console.log(title);
   // res.send("This is the example route with custom header and get method");

   // res.sendFile(__dirname + "/index.html");
   // res.download(__dirname + "/index.html", "downloaded_index.html");
   // res.location("/home").send("This is the example route with location header");
   // console.log(res.locals);
// });

      // View Engine and HTML Response: ExpressJS allows us to use view engines to render dynamic HTML pages. We can set up a view engine (e.g., EJS, Pug, Handlebars) and create templates that can be rendered with data from the server. This is useful for building web applications that require dynamic content.
      // Here we talk about EJS view engine. First, we need to install the EJS package using npm. Then, we can set EJS as the view engine in our Express application and create EJS templates to render HTML responses.

app.set("view engine", "ejs");

// app.get("/about", (req, res) => {
//    res.render("pages/about", { 
//       title: "About Page", 
//       description: "This is the about page rendered using EJS view engine." ,
//       name: "Noman Traders",
//       email: "nomantraders123@xyz.com"
//    });
// });

// app.get("/example", (req, res) => {
//    res.render("pages/home.ejs");
// });

// app.get("/test", (req, res) => {
//    res.render("test.ejs", {
//       name: "Sana Khalid",
//       email: "khalidsana666@gmail.com",
//       age: 25,
//       hobbies: ["Reading", "Traveling", "Cooking"]
//    });
// });
      
// app.get("/contact", (req, res) => {
//    res.send("<h1>Welcome to the contact Page</h1><p>This is a simple HTML response.</p>");
// });

      // Response format: ExpressJS allows us to send responses in various formats, such as plain text, HTML, JSON, and more. We can use the appropriate methods of the response object to send the desired format based on the client's request and our application's requirements.

// app.get("/example", (req, res) => {
//       res.format({
//             "text/plain": () => {
//                   res.send("This is a plain text response.");
//             },
//             "application/json": () => {
//                   res.json({ name: "Noman Traders", email: "nomantrader123@xyz.com" });
//             },
//             "text/html": () => {
//                   res.render("pages/home.ejs");
//             },
//             default: () => {
//                   res.status(406).send("Not Acceptable");
//             }
//       });
// });

      //http status codes: HTTP status codes are standardized codes that indicate the outcome of an HTTP request. ExpressJS allows us to set the status code of the response using the res.status() method. We can use different status codes to indicate success, client errors, server errors, and more based on the outcome of the request.

// app.get("/httpstatus", (req, res) => {
//    // res.status(200).send("This is the example route with status code 200");
// //    res.status(200).json({
// //       message: "This is the example route with status code 200",
// //       name: "Noman Traders",
// //       email: "noman123@xyz.com"
// //    });
//    // res.status(404).send("This is the example route with status code 404");
//    // res.status(500).send("This is the example route with status code 500");

//    res.sendStatus(200);
//    res.sendStatus(404);
//    res.sendStatus(500);
//    res.sendStatus(403);
// });

      //how to use middleware in ExpressJS: Middleware functions in ExpressJS are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. We can use middleware to perform various tasks, such as logging, authentication, error handling, and more. To use middleware, we can define a function and then use it in our routes or globally for all routes.

// const middleware1 = (req, res, next) => {
//    console.log("This is the first middleware.");
//    next();
// };

// const middleware2 = (req, res, next) => {
//    console.log("This is the second middleware.");
// //    res.send("This is the response from the second middleware.");
//    next();
// };

// const middleware3 = (req, res, next) => {
//    console.log("This is the third middleware.");
//    next();
// };

// const middleware4 = (req, res, next) => {
//    console.log("This is the fourth middleware.");
//    next();
// };

// const middleware5 = (obj) => { 
//       return (req, res, next) => {
//             console.log("This is the fifth middleware.");
//             console.log(obj);
//             req.name = obj.name;
//             req.email = obj.email;
//             next();
//       }
// };

// app.use(middleware1);
// app.use(middleware2);
// app.use(middleware3);
// app.use(middleware4);
// App Level Middleware: We can use middleware at the application level by calling app.use() and passing the middleware function as an argument. This will apply the middleware to all routes in the application. We can also specify a path as the first argument to apply the middleware only to routes that match that path.
// app.use(middleware5({ name: "Noman Traders", email: "noman123@xyz.com" }));

// app.get("/example", (req, res) => {
//       console.log(req.name);
//       console.log(req.email);
//       res.send("This is the example route.");
// });

// Route Level Middleware: We can also use middleware at the route level by passing the middleware function as an argument to the route handler. This will apply the middleware only to that specific route.

// app.get(
//       "/example", 
//       middleware5({ name: "Noman Traders", email: "noman123@xyz.com" }), 
//       (req, res) => {
//             console.log(req.name);
//             console.log(req.email);
//             res.send("This is the example route.");
//       }
// );

// Third-Party Middleware: ExpressJS has a rich ecosystem of third-party middleware that can be used to add functionality to our applications. We can install these middleware packages using npm and then use them in our application by requiring them and calling app.use().
// Example of a third-party middleware: morgan is a popular HTTP request logger middleware for Node.js. We can install it using npm and then use it in our ExpressJS application to log incoming requests.

// var morgan = require('morgan')
// app.use(morgan('dev'));

// Error Handling Middleware: In ExpressJS, we can define error-handling middleware to handle errors that occur during the request-response cycle. Error-handling middleware functions have four arguments: (err, req, res, next). We can use these middleware functions to catch and handle errors gracefully in our application.

// const middleware1 = (req, res, next) => {
// //    throw new Error("This is an error from the first middleware.");
// next("This is an error from the first middleware.");
// };

// const middleware2 = (req, res, next) => {
//    console.log("This is the second middleware.");
//    next();
// };

// app.use(middleware1);
// app.use(middleware2);

// app.get("/example", (req, res) => {
//    res.send("This is the example route.");
// });

// const errorHandlingMiddleware = (err, req, res, next) => {
//    console.error(err);
//    res.status(500).send("Something went wrong! Please try again later.");
// };

// app.use(errorHandlingMiddleware);

//built-in middle ware: ExpressJS provides several built-in middleware functions that can be used to perform common tasks. Some of the commonly used built-in middleware functions include:
// 1. express.json(): Parses incoming JSON requests and puts the parsed data in req.body.
// 2. express.urlencoded(): Parses incoming URL-encoded requests and puts the parsed data in req.body.
// 3. express.static(): Serves static files from a specified directory.
// 4. express.text(): Parses incoming text requests and puts the parsed data in req.body.
// 5. express.raw(): Parses incoming raw requests and puts the parsed data in req.body.

// const cookieParser = require("cookie-parser");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(express.text());
// app.use(express.raw());
// app.use(cookieParser());

      //Error Handling in ExpressJS: In ExpressJS, we can handle errors using error-handling middleware. This middleware is defined with four parameters: (err, req, res, next). We can use this middleware to catch and handle errors that occur during the request-response cycle. When an error is passed to the next() function, it will be caught by the error-handling middleware, allowing us to send a custom response to the client or log the error for debugging purposes.

// app.get("/error", (req, res, next) => {
//       // console.log(xyz);
//       res.send("This is the /error route.");
//       // throw new Error("This is an error from the /error route.");
//       // res.send("This is the /error route.");
// });

// const errorHandlingMiddleware = (err, req, res, next) => {
//       next(err.message);

//       // console.log(err);
//       // console.log("Error message:", err.message);
//       // console.log("Stack trace:", err.stack);
//       // res.send("Custom Error Handling");
// };

// app.use(errorHandlingMiddleware);

//Aync Error Handling: In ExpressJS, we can also handle asynchronous errors using the same error-handling middleware. When an error occurs in an asynchronous function (e.g., in a route handler that uses async/await), we can catch the error and pass it to the next() function to be handled by the error-handling middleware.
const fs = require("fs");

app.get("/async-error", (req, res, next) => {
      fs.readFile("text.txt", (err, data) => {
            if (err) {
                  next(err);
            } else {
                  res.send(data.toString());
            }
      });
});
const errorHandlingMiddleware = (err, req, res, next) => {
      console.error(err.stack);
};

app.use(errorHandlingMiddleware);
      // Setting up an ExpressJS server: To set up an ExpressJS server, we first need to install the Express package using npm. Then, we can create an instance of the Express application and define routes to handle incoming HTTP requests. Finally, we can start the server by listening on a specific port.

app.listen(8000, () => {
   console.log("Server is running on port 8000");
});
