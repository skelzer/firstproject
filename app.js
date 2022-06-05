var http = require("http")
var output =require("./module.js")
function callback(request,response){
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.write("Heyo man\n")
    response.end("Hello World")
    console.log(output.greeting)
}

http.createServer(callback).listen(8080);