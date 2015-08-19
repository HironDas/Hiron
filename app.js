//problem: we need a simple way to took at a user's badge count and javascript point from a web bowser
//solution: Use Node.js to perform the profile look ups and server our  template via HTTP

//1. Create a webserver
var http = require("http");
var router = require('./router.js');


http.createServer(function(request, response) {
   router.home(request, response);
   router.user(request, response);
}).listen(process.env.PORT || 1337, process.env.IP || '127.0.0.1' );

console.log('server running at http://<werkspace-url>/'+process.env.IP);



