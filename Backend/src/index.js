
const express = require("express")


const app = express()

const http = require("http").Server(app)

const mongoose = require("mongoose")
const io = require("socket.io")(http,{
    cors:{
        origin:"http://localhost:3000"
    }
})

const cors = require("cors")

app.use(
    cors({
      origin: `http://localhost:3000`,
      credentials:true
    }))

const router = require("./route/route")

const DBKey ="mongodb+srv://sunilmsz:syI90hdjRNtVD0Sy@videochatapp.pduqm.mongodb.net/rpsGame?retryWrites=true&w=majority"

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/", router)

mongoose.connect(DBKey, { useNewurlParser: true })
    .then(() => { console.log("MoongoDB is connected") })
    .catch(err => console.log(err));

io.on("connection", (socket) => {

    socket.on("gameStarted",(name)=>{
          
        socket.broadcast.emit("gameStarted",name)
    })

    socket.on("alreadyJoined",(name)=> {
       
        socket.broadcast.emit("alreadyJoined",name)
    })

    socket.on("otherUserSelection",(selection)=>{
        socket.broadcast.emit("otherUserSelection",selection)
    })

})



http.listen(5000, function () {
    console.log('Express app running on port ' + "3000")
});