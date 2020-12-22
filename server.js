const express = require("express");
const session = require("express-session");
const routes = require("./controllers");

// server configuration import
const sequelize = require("./config/connection");
// user session storage
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// start middleware

const app = express();
const PORT = process.env.PORT || 3001;

// sets up session options
const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

// these handle data formatting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// calls the index in the controllers folder
app.use(routes);

// end middleware

// server syncs with the models on start
sequelize.sync({ alter: false }).then(() => {
    app.listen(PORT, () =>
        console.log(`listening on http://localhost:${PORT}`)
    );
});
