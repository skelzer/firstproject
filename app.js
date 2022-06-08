const http = require("http")
const fs = require("fs")
const url = require("url")
const parser = require("accept-language-parser")
const express = require('express')
const app = express()
const port = 7070
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(__dirname+"/1/"))


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



app.get('/', function (req, res) {
    res.sendFile('index.html');
})
app.post("/login", function (req, res){
    let userName = req.body.user;
    let passWord = req.body.pass;
    console.log(userName + " " + passWord)
    res.json({status:true})
})




app.listen(port, function (){return console.log("Server started");})
//http.createServer(callback).listen(8080);