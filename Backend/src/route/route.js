const express = require('express')

const router =express.Router()

const gameController = require("../controller/gameConroller")

router.post("/game", gameController.createGame)

router.post("/game/:gameId",gameController.joinGame)

router.put("/game/:gameId", gameController.updateResult)

module.exports = router