//problem: we need a simple way to took at a user's badge count and javascript point from a web bowser
//solution: Use Node.js to perform the profile look ups and server our  template via HTTP

//1. Create a webserver
var http = require("http");

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    
    setInterval(function(){
        response.write(new Date() +'\n');
    }, 1000);
    
    // response.end("hello World !!");
}).listen(process.env.PORT, process.env.IP);
console.log('server running at http://<werkspace-url>/'+process.env.IP);

//2. Handle HTTP route GET/ and POST
//3. Handle http route get/:username i.e. /chalkers
//4. Functio that handles the reading of file and merge in value


