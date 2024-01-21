const fs = require('fs')
const path = require('path')
const { stdin, stdout } = require('process')
const pathToFile = path.join(__dirname, './text.txt')
const writeStream = fs.createWriteStream(pathToFile) 

process.on('exit', () => stdout.write('Good luck learning js and nodeJs'))
process.on('SIGINT', () => {
    process.exit() 
})


fs.open('./text.txt','a+', (err, f) => {
    stdin.on('data', (data) => {
         if (data.toString() === 'exit\r\n') {
            process.exit()
         }
        writeStream.write(data)
    })
    
})

