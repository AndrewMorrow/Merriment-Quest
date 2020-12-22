const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

// sets sequelize instance for heroku or .env options if not in heroku
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: "localhost",
            dialect: "mysql",
            port: 3306,
        }
    );
}

// exports the connection
module.exports = sequelize;
