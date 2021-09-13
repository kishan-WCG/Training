const fs = require('fs')

fs.unlink('demo.txt', (erre)=>{

        if (erre) {
            console.log(erre)
        }
        console.log('File Deleted')
}) 
