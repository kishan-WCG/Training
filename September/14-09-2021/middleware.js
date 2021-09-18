
const express = require('express')
const app = express()

function mymiddleware(Request, Response) {
    console.log('My Middleware')
}

function mymiddleware1(Request, Response){
    console.log('my Middleware1')
}

app.use(mymiddleware)
app.use(mymiddleware1)

app.listen(3000, () => {
    console.log('Server Created....')
})

app.get("/admin", mymiddleware, (Request, Response) => {
    Response.json({ message: 'API Is Working' })
})

app.get("/student", mymiddleware, (Request, Response) => {
    Response.json({ message: 'API Is Working' })
})


