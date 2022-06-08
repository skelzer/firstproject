const express = require('express');
const app = express();
const port = 7070;
const bodyParser = require("body-parser");
const _ = require("lodash")
const http = require("http").Server(app);
const io = require("socket.io")(http);
let playerList = new Map()
let playersReady = 0

app.use(express.static(__dirname+"/1/"))
app.get('/', function (req, res) {
    res.sendFile('index.html');
})
io.on("connection",function (s){
    console.log("Ready to use the socket")
    s.on("player", function (id){
        playerList.set(id, "")
        console.log("Player joined " + id)
        console.log(playerList)
        io.emit("newPlayer", Array.from(playerList))
    })
    s.on("ready", function (){
        playersReady++
        if (playersReady > 1 && playersReady == playerList.size){
            io.emit("gameOn")
            console.log("Game's on")
        }
    })
    s.on("unready", function (){ playersReady-- })
    s.on("roll", function (id){
        let roll = _.random(1,6)
        playerList.set(id, roll)
        io.emit("diceRolled", Array.from(playerList))
    })
})



const server = http.listen(port, function (){
    console.log("Ready on " + port)
})