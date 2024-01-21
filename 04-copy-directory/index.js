const fs = require('fs');
const path = require('path');
const dir = `${__dirname}/files-copy`



fs.access(dir, (err) => {
    if (err) {
        fs.mkdir(dir, { recursive: true }, () => {

        });
    }
    fs.readdir(dir,{withFileTypes: true}, (err, files) => {
        files.forEach(file => {
            fs.unlink(`${dir}/${file.name}`, (err) => {})
               
            })
        })
    
})
fs.readdir(`${__dirname}/files`,{withFileTypes: true}, (err, files) => {
    files.forEach(file => {
      fs.copyFile(`${__dirname}/files/${file.name}`, `${__dirname}/files-copy/${file.name}`, () => {
        
      })
       
    })
})