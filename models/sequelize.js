const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("libreria", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
