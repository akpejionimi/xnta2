const Sequelize = require("sequelize");

// database
const db = new Sequelize("savings", "root", process.env.MYSQL_PASSWORD, {
    dialect: "mysql",
    host: "localhost"
})

module.exports = db;