const fs = require('fs')

fs.writeFile('file-created.txt', 'Hello Word...!' , (erre)=>{
    if(erre){
        console.log(erre)
    }
    console.log('File Created .....')
})