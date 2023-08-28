const express = require('express');
const app = express();
const cors = require('cors')
const gamesController = require("./games/gamesController")
const usersController = require("./users/usersController")

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.use('/', gamesController)
app.use('/', usersController)



app.listen(8080, ()=>{
    console.log("API online")
})
