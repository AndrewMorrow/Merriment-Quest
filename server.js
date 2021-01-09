const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
require("dotenv").config();
const path = require("path");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");

// server configuration import
const sequelize = require("./config/connection");
// user session storage
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// start middleware

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });

// sets up session options
const sess = {
    secret: "Making Bacon Pancakes",
    cookie: { maxAge: 300000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

// view engine setup
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// these handle data formatting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// calls the index in the controllers folder
app.use(routes);

// end middleware

// server syncs with the models on start
sequelize.sync({ alter: false }).then(() => {
    app.listen(PORT, () =>
        console.log(`listening on http://localhost:${PORT}`)
    );
});
