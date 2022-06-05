const http = require("http")
const fs = require("fs")
const url = require("url")
const parser = require("accept-language-parser")
const {parse} = require("accept-language-parser");

function retrieveString(key, locale){
    var string = JSON.parse(fs.readFileSync('./strings.json','utf-8'))
    if (string){
        return string[key][locale]
    }
    else{
        return false
    }

}


function callback(request,response){
    const base = url.parse(request.url);
    const pathname = base.pathname;
    const fileName = '.'+ pathname+'.html';
    var userLocale= parser.parse(request.headers["accept-language"]);
    userLocale = userLocale[0]["code"]+"-"+userLocale[0]["region"]
        fs.readFile(fileName, function (err,data){
        if(err){
            response.writeHead(404,{'Content-Type':'text/html'});
            return response.end('<h1>Not Found</h1>')
        }
        response.writeHead(200, {'Content-Type':'text/html'});
        response.write(data);
        response.write("\n"+retrieveString("message", userLocale))
        response.end();
    })
}

http.createServer(callback).listen(8080);