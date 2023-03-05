const { DataTypes} = require('sequelize');
const sqlite = require('../repositories/sqlite');

const Favorites = sqlite.define('Favorites', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    urls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    }
})

module.exports = {
    Favorites
}
