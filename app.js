const http = require("http")
const fs = require("fs")
function callback(request,response){
    fs.readFile("index.html", function (err,data){
        response.writeHead(200, {'Content-Type':'text/html'});
        response.write(data);
        response.end();
    });
}

http.createServer(callback).listen(8080);