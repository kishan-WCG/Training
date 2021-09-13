const fs = require('fs')

fs.appendFile('appendfile.txt','this is one content',(erre)=>{

        if (erre) throw erre
        console.log('This is Secound Content')
})