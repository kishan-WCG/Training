var http = require('http')
http.createServer(function (req, res) {
    res.writeHead(200,{"content-type":"text/html"})
    if (req.url == "/student") {
        res.end("<h1>This is a Student Panel</h1>")
    }
    else if (req.url == "/admin") {
        res.end("<h1>This is a Admin </h1>")
    }
    else {
        res.end("<h1>This is Main Page</h1>")
    }
}).listen(1574)


