const fs = require('fs')

fs.rename('email.txt','email1.txt', (erre)=>{

    if (erre) {
        console.log(erre)
    }

    console.log('Renamed File')
}) 