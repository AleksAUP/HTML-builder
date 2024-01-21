const fs = require('fs');
const path = require('path');
const pathToFile = `${__dirname}/template.html`
const pathComponents = `${__dirname}/components`
let temp = ''
let arrTagStr = []
let arrTempStr = []
let tagName = ''
let objTemp = {}
const readStream =  fs.createReadStream(pathToFile)
readStream.on('data', (chunk) => {
    temp = chunk.toString()
   // console.log(temp.split('{{articles}}'));
     for (let i = 0; i < temp.length; i++) {
        if (temp[i] === '{' && temp[i + 1] !== '{' && temp[i] !== '}' ) {
            for (let j = i + 1; j < temp.length; j++) {
                if (temp[j] === '}') {
                    arrTagStr.push(`${tagName}.html`)
                    tagName = ''
                    break;
                }
               tagName += temp[j]          
            }   
        }
     }
     for (let i = 0; i < arrTagStr.length; i++) {
        arrTempStr.push(`{{${arrTagStr[i].slice(0,-5)}}}`)
        objTemp[arrTagStr[i]] = arrTempStr[i]

     }
     console.log(objTemp);
   
     fs.readdir(pathComponents,{withFileTypes: true}, (err, files) => {
        files.forEach((file, i) => {
           
            if (!file.isDirectory() && path.extname(file.name) === '.html') {
                fs.readFile(`${pathComponents}/${file.name}`,'utf8', (err,data) => {
                  temp =  temp.split(objTemp[file.name]).join(`${data}`)
                    // fs.writeFile(`${pathForBundle}/bundle.css`, data.toString(), {flag: 'a'}, () => {
                    console.log(temp);
                    // })
                })
             
            }
         
        })
  
        
    })
})
console.log(temp);