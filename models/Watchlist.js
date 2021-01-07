const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/connection");

class Watchlist extends Model {}

Watchlist.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        game_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "watchlist",
    }
);

module.exports = Watchlist;
