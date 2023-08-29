const express = require("express")
const Game = require("./Game")
const router = express.Router()
const jwt = require("jsonwebtoken")
const jwtSecret = "salgadodefeira"

// Authenticantion function
function auth(req, res, next){
    const authToken = req.headers['authorization']
    if(authToken != undefined){
        const bearer = authToken.split(" ")
        const token = bearer[1]
        jwt.verify(token, jwtSecret, (err, data) => {
            if(err){
                res.status(401)
                res.json({err: "Token don't match"})
            } else {
                req.token = token
                req.loggedUser = {id: data.id, email: data.email}
                next()
            }
        })


        res.status(200)
    } else{
        res.status(401)
        res.json({err: "Invalid Token!"})
    }
    console.log(authToken)
}

// Get all games
router.get('/games', auth, (req, res) => {
    Game.findAll()
        .then(games => {
            res.json(games)
        })
    res.status(200)
})

// Get game by id
router.get('/game/:id', (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    } else{
        let id = parseInt(req.params.id)
        Game.findOne({
            where: {id: id}
        })
            .then(game => {
                if(game != undefined){
                    res.statusCode = 200
                    res.json(game)
                }
            })
            .catch(() => {
                res.send(404)
            })
    }

})

// Add game
router.post('/game', (req, res) => {
    let {title, year, price} = req.body

    Game.create({
        title: title,
        year: year,
        price: price
    })

    res.sendStatus(200)
})

// Delete Game
router.delete('/game/:id', (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    } else{
        let id = parseInt(req.params.id)
        Game.destroy({where: {id: id}})
        res.sendStatus(200)
    }

})

// Update Data
router.put('/game/:id', (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    } else{
        let id = parseInt(req.params.id)
        Game.findOne({where: {id: id}})
            .then(game => {
                if(game != undefined){
                    let {title, price, year} = req.body

                    if(title != undefined){
                        Game.update({title: title},{where: {id: id}})
                    }

                    if(price != undefined){
                        Game.update({price: price},{where: {id: id}})
                    }

                    if(year != undefined){
                        Game.update({year: year},{where: {id: id}})
                    }

                    res.sendStatus(200)
                }
            })
            .catch(() =>{
                res.sendStatus(400)
            })

    }

})

module.exports = router
