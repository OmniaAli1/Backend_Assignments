const fs = require("node:fs");
const path = require("node:path");
const {createGzip} = require("node:zlib")
const gzip = createGzip()
const absolutePath = path.resolve("./big.txt")
const absolutePath2 = path.resolve("./source.txt")
const absolutePath3 = path.resolve("./dest.txt")
const absolutePath4 = path.resolve("./data.txt")
const absolutePath5 = path.resolve("./data.txt.gz")

/*1. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)

• Input Example: "./big.txt"
• Output Example: log each chunk*/

const readFileStream = fs.createReadStream(absolutePath,{encoding:"utf-8"})

readFileStream.on("data",(chunk) => {
    console.log(chunk);
})

/*
2. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
• Input Example: "./source.txt", "./dest.txt"
• Output Example: File copied using streams
*/
const readFileStream1 = fs.createReadStream(absolutePath2,{encoding:"utf-8"})
const writeFileStream = fs.createWriteStream(absolutePath3)

readFileStream1.on("data",(chunk) => {
    writeFileStream.write(chunk)
})

/*3. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
• Input Example: "./data.txt", "./data.txt.gz"*/

const readFileStream2 = fs.createReadStream(absolutePath4)
const writeFileStream1 = fs.createWriteStream(absolutePath5)

readFileStream2.pipe(gzip).pipe(writeFileStream1)