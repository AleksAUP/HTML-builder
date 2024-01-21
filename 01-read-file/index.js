const fs = require('fs');
const path = require('path');
const { stdout } = process;


const pathToFile = path.join(__dirname, './text.txt')
const readStream =  fs.createReadStream(pathToFile)
readStream.on('data', (chunk) => {
    stdout.write(chunk.toString());
})