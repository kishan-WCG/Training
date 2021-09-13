var express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())

app.listen(3000, () => {
    console.log("Listening On Port 3000")
})
app.get('/', function (req, res) {  
    res.sendFile( __dirname + "/" + "form.html" );  
 })  


app.post("/student",(req, res) => {
   let  first_name = req.body.first_name 
    let last_name = req.body.last_name 
    let email = req.body.email 
    let message = req.body.message 
    
        res.json({
            "First Name": first_name,
            "Last Name" : last_name,
            "Email" : email,
            "Message" : message
        })
    
})