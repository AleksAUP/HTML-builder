const fs = require('fs')
const path = require('path')
const {exec} = require('child_process')

const dir = `${__dirname}/styles`
const pathForBundle = `${__dirname}/project-dist`
fs.promises.writeFile(`${pathForBundle}/bundle.css`, '')
.then(() => {
    console.log('done')
    fs.readdir(dir,{withFileTypes: true}, (err, files) => {
        fs.open(`${pathForBundle}/bundle.css`, 'r', (err, fd) => {
            if(!err){
    
            }
    
          });
        files.forEach(file => {
            if (!file.isDirectory() && path.extname(file.name) === '.css') {
                fs.readFile(`${dir}/${file.name}`,'utf8', (err,data) => {
    
                    fs.writeFile(`${pathForBundle}/bundle.css`, data.toString(), {flag: 'a'}, () => {
    
                    })
                })
             
            }
           
        })
        
       
    })
})

let wait = false

fs.watch(dir,(eventType, fileName) => {
            
    console.log(eventType, fileName);
    if (eventType || fileName) {
        if (wait) {
            return
        }
        wait = setTimeout(() => {
            wait = false
        },1000)
    }
  
    
    fs.promises.writeFile(`${pathForBundle}/bundle.css`, '')
    .then(() => {
        console.log('done')
        fs.readdir(dir,{withFileTypes: true}, (err, files) => {
            fs.open(`${pathForBundle}/bundle.css`, 'r', (err, fd) => {
                if(!err){
        
                }
        
              });
            files.forEach(file => {
                if (!file.isDirectory() && path.extname(file.name) === '.css') {
                    fs.readFile(`${dir}/${file.name}`,'utf8', (err,data) => {
        
                        fs.writeFile(`${pathForBundle}/bundle.css`, data.toString(), {flag: 'a'}, () => {
        
                        })
                    })
                 
                }
               
            })
            
           
        })
    })
   
})