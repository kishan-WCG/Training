const fs = require('fs')
const path = require('path')

fs.mkdir(path.join(__dirname, 'Test'),(error)=>{
    if (error){
        return console.log(error)
    }

    console.log('Directory successfully')
})