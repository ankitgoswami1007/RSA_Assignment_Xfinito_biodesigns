const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId;

const gameSchema = new mongoose.Schema({

    userName:[String],
    startStatus:{
        type:Boolean,
        default:false
    },
    result :{
        type:Boolean,
        default:false
    },   // true -> someOne will win or loose, false -> tie
    winner: String,
    looser: String

},{timestamps:true})


module.exports = mongoose.model("Game",gameSchema);