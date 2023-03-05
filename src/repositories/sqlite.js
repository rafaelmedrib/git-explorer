const { Sequelize } = require('sequelize');
const { DATABASE_TYPE, DATABASE_STORAGE_PATH } = require("../config/environment");

const sqlite = new Sequelize({
    dialect: DATABASE_TYPE,
    storage: DATABASE_STORAGE_PATH,
    logging: false
});

module.exports = sqlite;
