
const color = require('cli-color')
const path = require('path')

// console.log(color.red('hello'))
// console.log(color.yellowBright('hello'))

const fs = require('fs')
// const { buffer } = require('node:stream/consumers')


// folder create.

// fs.mkdir(path.join(__dirname, '/test' , 'demo'), (err) => {
//     if (err){
//         console.log("Something Want Wrong")
//         return
//     }
//     console.log("Folder Crated...")
// })

// File Create

// fs.writeFile(path.join(__dirname, "test" , 'node.txt'),
// 'Hello NODEJS',(err)=>{
//     if(err){
//         throw err
//     }
//      console.log("File Created...")
// })

fs.readFile(path.join(__dirname, 'test' ,'node.txt'), 'utf8',
    (err , data) => {

        if(err) {
                throw err
        }
       

        console.log(data)
})