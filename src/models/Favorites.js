const { DataTypes} = require('sequelize');
const sqlite = require('../repositories/sqlite');

const Favorites = sqlite.define('Favorites', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
    }
})

module.exports = {
    Favorites
}
