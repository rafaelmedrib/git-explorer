const { DataTypes } = require('sequelize');
const sqlite = require('../repositories/sqlite');
const { Favorites } = require("./Favorites");

const User = sqlite.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.hasMany(Favorites);
Favorites.belongsTo(User);

module.exports = { User };
