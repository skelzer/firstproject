const http = require("http")
const fs = require("fs")
const url = require("url")

function callback(request,response){
    const base = url.parse(request.url);
    const pathname = base.pathname;
    const fileName = '.'+ pathname+'.html';
    fs.readFile(fileName, function (err,data){
        if(err){
            response.writeHead(404,{'Content-Type':'text/html'});
            return response.end('<h1>Not Found</h1>')
        }
        response.writeHead(200, {'Content-Type':'text/html'});
        response.write(data);
        response.end();
    })



}

http.createServer(callback).listen(8080);