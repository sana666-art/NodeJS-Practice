const os = require("os");

console.log(os);
console.log(typeof os);

let hostname = os.hostname();
console.log( "The Hostname: ",hostname);

let type = os.type();
console.log("The type of OS: ",type);

let cpus = os.cpus();
console.log(cpus);

let arch = os.arch();
console.log(arch);

let platform = os.platform();
console.log(platform);

let totalmem = os.totalmem();
console.log("Total Memory: ", totalmem);

let freemem = os.freemem();
console.log("Free Memory: ", freemem);

let homedir = os.homedir();
console.log("Home Directory: ", homedir);

let uptime = os.uptime();
console.log("Uptime of System: ", uptime);

let userInfo = os.userInfo();
console.log("User Info: ", userInfo);

let release = os.release();
console.log("OS Release: ", release);

let networkInterfaces = os.networkInterfaces();
console.log("Network Interfaces: ", networkInterfaces);

let endianness = os.endianness();
console.log("Endianness: ", endianness);

let tmpdir = os.tmpdir();
console.log("Temporary Directory: ", tmpdir);

let loadavg = os.loadavg();
console.log("Load Average: ", loadavg);

let constants = os.constants;
console.log("OS Constants: ", constants);

let serial = os.serial();
console.log("Serial Number: ", serial);

let getPriority = os.getPriority();
console.log("Process Priority: ", getPriority);

let setPriority = os.setPriority(process.pid, 10);
console.log("Set Process Priority: ", setPriority);

let cpusInfo = os.cpus();
console.log("CPUs Information: ", cpusInfo);

let endiannessType = os.endianness();
console.log("Endianness Type: ", endiannessType);

let userInfoDetails = os.userInfo();
console.log("User Information Details: ", userInfoDetails);

let networkInfo = os.networkInterfaces();
console.log("Network Information: ", networkInfo);

let uptimeSeconds = os.uptime();
console.log("System Uptime in Seconds: ", uptimeSeconds);

