const sequelize = require("sequelize")
const connection = require("../database/Data")

const Game = connection.define('games', {
    title: {
        type: sequelize.STRING,
        allowNull: false 
    },
    year: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize.FLOAT,
        allowNull: false
    }
})

module.exports = Game
