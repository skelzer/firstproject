const http = require("http")
const fs = require("fs")
const url = require("url")
const parser = require("accept-language-parser")
const express = require('express')
const app = express()
const port = 7070




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
    var userLocale= parser.parse(request.headers["accept-language"]);
    userLocale = userLocale[0]["code"]+"-"+userLocale[0]["region"]
    response.send("Hey there")
    response.end();
    }



app.get("/", callback)
app.listen(port, function (){return console.log("Server started");})
//http.createServer(callback).listen(8080);