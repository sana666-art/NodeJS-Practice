const Events = require("events");
const fs = require("fs");

const { EventEmitter } = Events;

const eventEmitter = new EventEmitter();

// Example 1: Basic event handling
// eventEmitter.on("message", () => console.log("Event triggered"));
// eventEmitter.emit("message");
// eventEmitter.on("message", (data) => console.log(`Event triggered with data: ${data}`));
// eventEmitter.emit("message", "Hello, World!");

//rejister an event
// eventEmitter.on("Event-1", function (param1, value1, name) { 
//     console.log("Event-1 triggered")
//     console.log(`Event-1 data: ${param1}`)
//     console.log(`Event-1 value: ${value1}`)
//     console.log(`Event-1 name: ${name}`)
// });

// eventEmitter.on("Event-2", function (obj) { 
//     console.log("Event-2 triggered")
//     console.log(`Event-2 data: ${JSON.stringify(obj)}`)
// });

//raise or emit an event
// eventEmitter.emit("Event-1", "Event-1 data", "Event-1 value", "Ayzal");
// eventEmitter.emit("Event-2", {name: "Ayzal", age: 50, city: "New York"});

eventEmitter.on("Event-1", function (content) { 
    fs.writeFile("test.txt", JSON.stringify(content), function (err) {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log("Event data written to test.txt");
        }   
    });
});

module.exports = eventEmitter;