const fs = require('fs');
const path = require('path');

function createHtml () {
    const pathToFile = `${__dirname}/template.html`
const pathComponents = `${__dirname}/components`
let temp = ''
let arrTagStr = []
let arrTempStr = []
let tagName = ''
let objTemp = {}
const readStream =  fs.createReadStream(pathToFile)
let ReadStreamHtml = null


readStream.on('data', (chunk) => {
    temp = chunk.toString()
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
     fs.readdir(pathComponents,{withFileTypes: true}, (err, files) => {
        files.forEach((file, i) => {
            ReadStreamHtml = fs.createReadStream(`${pathComponents}/${file.name}`)
            if (!file.isDirectory() && path.extname(file.name) === '.html') {
                ReadStreamHtml.on(`data`, (data) => {
                  temp =  temp.split(objTemp[file.name]).join(`${data.toString()}`)
                })
             
            }
         
        })
        ReadStreamHtml.on('end', () => {
            fs.writeFile(`${__dirname}/project-dist/index.html`, temp, () => {
            })
        })
  
       
    })
})
readStream.on('end', () => {
    fs.mkdir(`${__dirname}/project-dist`, { recursive: true }, () => {
       
        
    });
})
}
createHtml()

const dir = `${__dirname}/styles`;
const pathForBundle = `${__dirname}/project-dist`;


function createCss () {

    let temp = ''
        fs.readdir(dir,{withFileTypes: true}, (err, files) => {
            let readStream = null
           
            files.forEach((file, i) => {
                readStream =  fs.createReadStream(`${dir}/${file.name}`)
                if (!file.isDirectory() && path.extname(file.name) === '.css') {
                    readStream.on('data', (data) => {
                        temp += data.toString()    
                    })
                    readStream.on('end', () => {
                        fs.writeFile(`${pathForBundle}/bundle.css`,temp, () => {
                            temp = ''
                            copyAssets(assetsPath, distPath)
                        }) 
                    } )
                }
            })  
        })
}

createCss()

fs.watch(dir,(eventType, fileName) => {
        createCss()   
    
})
let assetsPath = `${__dirname}/assets`
let distPath = `${__dirname}/project-dist/assets`

function copyAssets (assetsPath, distPath) {
    fs.mkdir(`${distPath}`, () => {
        fs.readdir(assetsPath,{withFileTypes: true}, (err, files) => {
            console.log(assetsPath);
            console.log(files);
            files.forEach(file => {
                fs.stat(`${assetsPath}/${file.name}`, (errStat, status) => {
                    if (status.isDirectory()) {
                        copyAssets(assetsPath + '/' + file.name, distPath + '/' + file.name);
                    }
                     else{
                        
                        fs.copyFile(`${assetsPath}/${file.name}`, `${distPath}/${file.name}`, () => {
                            console.log(`${distPath}/${file.name}`);
                        })
                    } 
                 });
              
               
            })
        })         
    })
    
}
