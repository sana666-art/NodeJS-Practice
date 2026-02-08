const path = require("path");

// console.log(path);
// console.log(typeof path);
// console.log(path.basename(__filename));

let myPath = "C:/Users/User/Documents/NodeJS/Core Module/path module/app.js";
let parsedPath = path.parse(myPath);
let baseName = path.basename(myPath);
let dirName = path.dirname(myPath);
let extName = path.extname(myPath);


// console.log("Base Name: ", baseName);
// console.log("Directory Name: ", dirName);
// console.log("Extension Name: ", extName);
// console.log("Parsed Path Object: ", parsedPath);

let newPath = path.format(parsedPath);
console.log("Formatted Path: ", newPath);

let isAbsolute = path.isAbsolute(myPath);
console.log("Is Absolute Path: ", isAbsolute);

let joinedPath = path.join("C:/Users/User", "Documents", "NodeJS", "Core Module", "path module", "app.js");
console.log("Joined Path: ", joinedPath);

let resolvedPath = path.resolve("C:/Users/User", "Documents", "NodeJS", "Core Module", "path module", "app.js");
console.log("Resolved Path: ", resolvedPath);

let relativePath = path.relative("C:/Users/User/Documents", myPath);
console.log("Relative Path: ", relativePath);

let normalizedPath = path.normalize("C:/Users//User/Documents/NodeJS/Core Module/path module//app.js");
console.log("Normalized Path: ", normalizedPath);
 
let sep = path.sep;
console.log("Path Separator: ", sep);

let delimiter = path.delimiter;
console.log("Path Delimiter: ", delimiter);

let posix = path.posix;
console.log("POSIX Path: ", posix.join("C:/Users/User", "Documents", "NodeJS", "Core Module", "path module", "app.js"));

let win32 = path.win32;
console.log("Win32 Path: ", win32.join("C:/Users/User", "Documents", "NodeJS", "Core Module", "path module", "app.js"));

let toNamespacedPath = path.toNamespacedPath(myPath);
console.log("Namespaced Path: ", toNamespacedPath);

let fromNamespacedPath = path.fromNamespacedPath(toNamespacedPath);
console.log("From Namespaced Path: ", fromNamespacedPath);