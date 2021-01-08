const User = require("./User");
const Watchlist = require("./Watchlist");
// const { DataTypes } = require("sequelize");

// associations will go here
Watchlist.belongsTo(User, {
    allowNull: false,
});

User.hasMany(Watchlist, {
    onDelete: "CASCADE",
});

// export all models here
module.exports = { User, Watchlist };
