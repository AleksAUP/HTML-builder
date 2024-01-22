const fs = require('fs');
const path = require('path');
const dir = `${__dirname}/styles`;
const pathForBundle = `${__dirname}/project-dist`;



function createCss () {

    let temp = ''
    console.log('done')
   
        fs.readdir(dir,{withFileTypes: true}, (err, files) => {
            let readStream = null
           
            files.forEach((file, i) => {

                readStream =  fs.createReadStream(`${dir}/${file.name}`)
                if (!file.isDirectory() && path.extname(file.name) === '.css') {
                    readStream.on('data', (data) => {
                        temp += data.toString()
                        console.log('openPort');
                       
                        
                    })
                    readStream.on('end', () => {
                        fs.writeFile(`${pathForBundle}/bundle.css`,temp, () => {
                            temp = ''
                        })
                        console.log('closePort');
                       
                    } )
                  
                }
               
            })
            
           
        })
   
    



}
createCss()
fs.watch(dir,(eventType, fileName) => {
        createCss()   
    
})