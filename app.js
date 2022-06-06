const http = require("http")
const fs = require("fs")
const url = require("url")
const parser = require("accept-language-parser")
const express = require('express')
const app = express()
const port = 7070


app.use(express.static(__dirname))

const users = [
    {user:"Migue", password:"pass1"},
    {user:"Migue2", password:"pass2"},
    {user:"Migue3", password:"pass3 "}
]


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
    response.send("Hey theddre")
    response.end();
    }



app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.get("/users", function (req, res){
    res.send(users)
})



app.listen(port, function (){return console.log("Server started");})
//http.createServer(callback).listen(8080);