const express = require("express")
const User = require("./User")
const router = express.Router()
const jwt = require("jsonwebtoken")

const jwtSecret = "salgadodefeira"
router.get('/users', (req, res) => {
    User.findAll().then(users => {
        res.json(users)
    }).catch(err => {
        console.log(err)
    })
    res.sendStatus(200)
})

router.post('/user', (req, res) => {
    let {name, email, password} = req.body

    if({name, email, password} != undefined){
        User.create({
            name: name,
            email: email,
            password: password
        })
        res.sendStatus(200)
    } else{
        res.sendStatus(400)
    }
})

router.post('/auth', (req, res) => {
    let {email, password} = req.body

    if(email != undefined && password != undefined){
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if(user.password == password){
                res.status(200)
                jwt.sign({id: user.id, email: user.email}, jwtSecret, {expiresIn: '48h'}, (err, token) => {
                    if(err){
                        res.status(400)
                        res.json({err: "Intern failure"})
                    } else {
                        res.status(200)
                        res.json({token: token})
                    }
                })
            } else{
                res.status(401)
                res.json({err: "Incorrect password!"})
            }
        }).catch(() => {
            res.status(404)
            res.json({err: "User not found"})
        })
    } else {
        res.status(403)
        res.json({err: "Invalid email or password"})
    }
})

module.exports = router
