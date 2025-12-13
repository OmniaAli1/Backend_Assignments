const path = require("path");
const fs = require("fs");
const os = require("os");
const EventEmitter = require("events");

/*1. Write a function that logs the current file path and directory. (0.5 Grade)
• Output Example:{File:“/home/user/project/index.js”, Dir:“/home/user/project”}*/
function logPath() {
  console.log({
    File: __filename,
    Dir: __dirname
  });
}
logPath();


/*2. Write a function that takes a file path and returns its file name. (0.5 Grade)
• Input Example: /user/files/report.pdf
• Output Example:"report.pdf"*/
function getFileName(filePath) {
  return path.basename(filePath);
}
console.log(getFileName("/user/files/report.pdf"));


/*3. Write a function that builds a path from an object (0.5 Grade)
• Input Example: { dir: "/folder", name: "app", ext: ".js"}
• Output Example: “/folder/app.js”*/
function buildPath(obj) {
  return path.join(obj.dir, obj.name + obj.ext);
}
console.log(buildPath({ dir: "/folder", name: "app", ext: ".js" }));


/*4. Write a function that returns the file extension from a given file path. (0.5 Grade)
• Input Example: /docs/readme.md"
• Output Example: “.md”*/
function getExtension(filePath) {
  return path.extname(filePath);
}
console.log(getExtension("/docs/readme.md"));

/*5. Write a function that parses a given path and returns its name and ext. (0.5 Grade)
• Input Example: /home/app/main.js
• Output Example: { Name: “main”, Ext: “.js” }*/
function parsePath(filePath) {
  return {
    Name: path.parse(filePath).name,
    Ext: path.parse(filePath).ext
  };
}
console.log(parsePath("/home/app/main.js"));

/*6. Write a function that checks whether a given path is absolute. (0.5 Grade)
• Input Example: /home/user/file.txt
• Output Example: true*/
function isAbsolutePath(filePath) {
  return path.isAbsolute(filePath);
}
console.log(isAbsolutePath("/home/user/file.txt"));


/*7. Write a function that joins multiple segments (0.5 Grade)
• Input:"src","components", "App.js"
• Output Example: src/components/App.js*/
function joinSegments(...segments) {
  return path.join(...segments);
}
console.log(joinSegments("src", "components", "App.js"));


/*8. Write a function that resolves a relative path to an absolute one. (0.5 Grade)
• Input Example: ./index.js
• Output Example: /home/user/project/src/index.js*/
function resolvePath(relativePath) {
  return path.resolve(relativePath);
}
console.log(resolvePath("./index.js"));


/*9. Write a function that joins two paths. (0.5 Grade)
• Input Example: /folder1, folder2/file.txt
• Output Example: /folder1/folder2/file.txt*/
function joinTwoPaths(p1, p2) {
  return path.join(p1, p2);
}
console.log(joinTwoPaths("/folder1", "folder2/file.txt"));


/*10. Write a function that deletes a file asynchronously. (0.5 Grade)
• Input Example: /path/to/file.txt
• Output Example: The file.txt is deleted.*/
function deleteFile(filePath) {
  fs.writeFileSync(filePath, "test"); // create file first
  fs.unlink(filePath, () => {
    console.log("The file.txt is deleted.");
  });
}
deleteFile("./file.txt");


/*11. Write a function that creates a folder synchronously. (1 Grade)
• Output Example: “Success”*/
function createFolder(folderPath) {
  fs.mkdirSync(folderPath, { recursive: true });
  console.log("Success");
}
createFolder("./myFolder");


/*12. Create an event emitter that listens for a "start" event and logs a welcome message. (0.5 Grade)
• Output Example: Welcome event triggered!*/
const emitter = new EventEmitter();

emitter.on("start", () => {
  console.log("Welcome event triggered!");
});
emitter.emit("start");


/*13. Emit a custom "login" event with a username parameter. (0.5 Grade)
• Input Example:"Ahmed"
• Output Example: “User logged in: Ahmed”*/
emitter.on("login", (username) => {
  console.log(`User logged in: ${username}`);
});
emitter.emit("login", "Ahmed");


/*14. Read a file synchronously and log its contents. (1 Grade)
• Input Example:"./notes.txt"
• Output Example: the file content => “This is a note.”*/
fs.writeFileSync("./notes.txt", "This is a note.");
function readFile(filePath) {
  const data = fs.readFileSync(filePath, "utf8");
  console.log(data);
}
readFile("./notes.txt");


/*15. Write asynchronously to a file. (1 Grade)
• Input: path:"./async.txt", content:"Async save"*/
function writeAsync(filePath, content) {
  fs.writeFile(filePath, content, () => {
    console.log("Async save");
  });
}
writeAsync("./async.txt", "Async save");


/*16. Check if a directory exists. (0.5 Grade)
• Input Example: "./notes.txt"
• Output Example: true*/
function checkExists(filePath) {
  return fs.existsSync(filePath);
}
console.log(checkExists("./notes.txt"));


/*17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
• Output Example: {Platform: “win32”, Arch: “x64”}*/
function getOSInfo() {
  return {
    Platform: os.platform(),
    Arch: os.arch()
  };
}
console.log(getOSInfo());