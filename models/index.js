const User = require("./User");
const Watchlist = require("./Watchlist");
const { DataTypes } = require("sequelize");

// associations will go here
Watchlist.belongsTo(User, {
    foreignKey: {
        allowNull: false,
        type: DataTypes.UUID,
    },
});

User.hasMany(Watchlist, {
    foreignKey: {
        onDelete: "CASCADE",
        type: DataTypes.UUID,
    },
});

// export all models here
module.exports = { User, Watchlist };
