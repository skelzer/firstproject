const express = require('express');
const app = express();
const port = 7070;
const bodyParser = require("body-parser");
const _ = require("lodash")
const http = require("http").Server(app);
const io = require("socket.io")(http);

let playerList = []
let playersReady = 0

app.use(express.static(__dirname+"/1/"))
app.get('/', function (req, res) {
    res.sendFile('index.html');
})
io.on("connection",function (s){
    console.log("Ready to use the socket")
    s.on("player", function (id){
        const player = {id : null , roll : null}
        player.id = id
        console.log("Player joined " + player.id)
        playerList.push(player)
        io.emit("newPlayer", playerList)
    })
    s.on("ready", function (){
        playersReady++
        if (playersReady > 1 && playersReady == playerList.length){
            io.emit("gameOn")
            console.log("Game's on")
        }
    })
    s.on("unready", function (){ playersReady-- })
})



const server = http.listen(port, function (){
    console.log("Ready on " + port)
})