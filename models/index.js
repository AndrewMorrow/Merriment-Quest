const User = require("./User");
const Watchlist = require("./Watchlist");
// const { DataTypes } = require("sequelize");

// associations will go here
Watchlist.belongsTo(User, {});

User.hasMany(Watchlist, {});

// export all models here
module.exports = { User, Watchlist };
