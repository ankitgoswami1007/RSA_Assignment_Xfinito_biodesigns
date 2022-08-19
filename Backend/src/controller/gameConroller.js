const { findById } = require('../models/gameModel')
const gameModel = require('../models/gameModel')

const createGame = async (req, res) => {
    try {

        const { name } = req.body

        const gameData = await gameModel.create({ userName: name })

        res.status(201).send({ status: true, msg: "game created", id: gameData._id })

    } catch (error) {
            console.log(error)
        res.status(500).send({ status: false, msg: "Intrnal server Error" })

    }

}

const joinGame = async (req, res) => {

    try {
        const { name} = req.body
        const {gameId} =req.params

        const gameData = await gameModel.findById(gameId).select({userName:1})

        if (!findById)
            return res.status(400).send({ status: false, msg: "No game created yet" })

        if (gameData.userName.length > 1)
            return res.status(400).send({ status: false, msg: "Game already started" })

        const game = await gameModel.findByIdAndUpdate(gameId, { $push: { userName: name } })

        res.status(200).send({ status: true, msg: "joined to game" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: "Intrnal server Error" })
    }

}


const updateResult = async (req, res) => {
    try {
        const { wName, lName } = req.body
        const {gameId} =req.params

        const gameData = await gameModel.findByIdAndUpdate(gameId, { result: true, winner: wName, looser: lName })

        if (!gameData)
        return res.status(400).send({ status: false, msg: "No game created yet" })

        res.status(200).send({ status: true, msg: "result updated" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: "Intrnal server Error" })
    }

}

module.exports = {createGame,joinGame,updateResult}