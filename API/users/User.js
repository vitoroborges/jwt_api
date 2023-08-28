const connection = require("../database/Data")
const Sequelize = require("sequelize")

const User = connection.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

connection.sync({force: true})

module.exports = User
