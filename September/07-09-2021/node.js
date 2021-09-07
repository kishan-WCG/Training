// var http = require('http');

 //create a server object:
// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.writeHead(200, {'content-type':'text/html'})
//   res.end(); //end the response
// }).listen(1574); //the server object listens on port 8080



var http1 = require('http')

http1.createServer(function(req, res,){
  res.write('<h2>hello For First Server</h2>')
 
  res.end();
}).listen(1574)












