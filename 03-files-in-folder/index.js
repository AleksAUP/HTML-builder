const fs = require('fs');
const path = require('path');

fs.readdir(`${__dirname}/secret-folder`,{withFileTypes: true}, (err, files) => {
    files.forEach(file => {
        if (!file.isDirectory()) {
            let extend = path.extname(file.name);
            let ext = '';
            for(let i = 0; i < extend.length; i++) {
                if (extend[i] !== '.') {
                    ext += extend[i]
                }
            }
            
            fs.stat(`${__dirname}/secret-folder/${file.name}`, (err, stats) => {
                if (err) {
                   console.log(err.message); 
                }
                let filName = path.parse(file.name).name;
                let extend = path.extname(file.name);
                let sizeFiel = stats.size
                let finalFinalStat = `${filName} - ${ext} - ${sizeFiel}B\r\n`
                process.stdout.write(finalFinalStat)
            })
         
        }
        
    })
})
