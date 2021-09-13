const fs = require('fs')

fs.open('email.txt', 'w' ,function(err, file){

    if(err) {
    console.log(err)
    }
 console.log('File Open')
})