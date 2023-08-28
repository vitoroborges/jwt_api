const Sequelize = require("sequelize")

const connection = new Sequelize('gameApi', 'root', 'C.oxinha4321', {
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00",
    logging: false
})

module.exports = connection
