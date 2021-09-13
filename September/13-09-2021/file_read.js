const fs = require ('fs')

fs.readFile('email1.txt', 'utf-8', (erre ,data)=>{
    if (erre) throw erre
    console.log(data)
})