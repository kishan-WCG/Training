const express = require('express')
const app = express()


app.put("/student/:id", (Request, Response)=>{
    let body = Request.body
    console.log(`You Want to Update Data ${Request.params.id}`)
    console.log(`Data Is ${body}`)
    Request.json({message :'Put Request'})
})