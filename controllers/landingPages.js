const router = require("express").Router();
const { User, Watchlist } = require(".././models");
const withAuth = require("../utils/auth");
const axios = require("axios");
const _ = require("lodash/core");

//           Home Page
router.get("/", async (req, res) => {
    try {
        res.render("homepage", {
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//     Dashboard Landing Page
// get all blogs for a specific user
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        let watchData = true;
        const dbWatchData = await User.findByPk(req.session.user_id, {
            attributes: {
                exclude: ["user_password", "user_id"],
            },
            include: [{ model: Watchlist }],
        });

        watchData = await dbWatchData.get({ plain: true });
        console.log(watchData);

        if (_.isEmpty(watchData.watchlists)) {
            watchData = false;
        }

        console.log(watchData);

        res.render("dashboard", {
            logged_in: req.session.loggedIn,
            watchData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/gamefinder", async (req, res) => {
    try {
        res.render("gameFinder", {
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/dealfinder", async (req, res) => {
    try {
        res.render("dealFinder", {
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/gameview", async (req, res) => {
    try {
        res.render("gameview", {
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login route
router.get("/login", (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    // Otherwise, render the 'login' template
    res.render("login", {
        logged_in: req.session.loggedIn,
    });
});

// Signup route
router.get("/signup", (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    // Otherwise, render the 'sign-up' template
    res.render("sign-up");
});

// route: /cheapsharkSearch
router.get("/cheapsharkSearch", async (req, res) => {
    try {
        let rawgParams = {};
        let cheapValue = true;
        let hasRating = true;
        let hasVideo = true;
        // console.log(req.query.title);
        const cheapConfig = {
            url: `/deals?title=${req.query.title}&sortBy=Title&limit=1&storeID=1,2,3,7,11&onSale=1`,
            method: "GET",
            baseURL: "https://www.cheapshark.com/api/1.0",
        };
        const apiCheapData = await axios.request(cheapConfig);
        const cheapData = apiCheapData.data;
        // console.log(cheapData);

        if (_.isEmpty(cheapData)) {
            // console.log("data is empty");
            cheapValue = false;
        }

        rawgParams.search = req.query.title;

        const rawgConfig = {
            url: "games?page_size=1&search_precise=1",
            method: "GET",
            baseURL: "https://api.rawg.io/api",
            params: rawgParams,
        };
        const apiGameData = await axios.request(rawgConfig);
        const game = apiGameData.data.results[0];
        // console.log(game);

        if (_.isEmpty(game.ratings)) {
            // console.log("data is empty");
            hasRating = false;
        }

        if (_.isEmpty(game.clip)) {
            // console.log("data is empty");
            hasVideo = false;
        }
        res.render("gameView", {
            logged_in: req.session.loggedIn,
            game,
            cheapData,
            cheapValue,
            hasVideo,
            hasRating,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// route: /gameDealFiner
router.get("/gameDealFinder", async (req, res) => {
    try {
        let rawgParams = {};
        let cheapParams = {};
        let cheapValue = true;
        let hasVideo = true;
        let hasRating = true;

        if (Object.keys(req.query.platforms).length !== 0) {
            rawgParams.platforms = req.query.platforms;
        }
        if (Object.keys(req.query.genres).length !== 0) {
            rawgParams.genres = req.query.genres;
        }
        if (Object.keys(req.query.tags).length !== 0) {
            rawgParams.tags = req.query.tags;
        }
        const rawgConfig = {
            url: "games?page_size=20&ordering=-metacritic",
            method: "GET",
            baseURL: "https://api.rawg.io/api",
            params: rawgParams,
        };

        const apiGameData = await axios.request(rawgConfig);

        const gameDataLen = apiGameData.data.results.length;
        const gameData = apiGameData.data.results;

        const randNum = function getRandNum(maxNum) {
            return Math.floor(Math.random() * Math.floor(maxNum));
        };
        const game = gameData[randNum(gameDataLen)];

        cheapParams.title = game.name;

        const cheapConfig = {
            url: "/deals?sortBy=Title&limit=1&storeID=1,2,3,7,11&onSale=1",
            method: "GET",
            baseURL: "https://www.cheapshark.com/api/1.0",
            params: cheapParams,
        };

        const apiCheapData = await axios.request(cheapConfig);
        const cheapData = apiCheapData.data;

        // console.log(cheapData);

        if (_.isEmpty(cheapData.length)) {
            cheapValue = false;
        }
        if (_.isEmpty(game.ratings)) {
            // console.log("data is empty");
            hasRating = false;
        }

        if (_.isEmpty(game.clip)) {
            // console.log("data is empty");
            hasVideo = false;
        }

        res.render("gameView", {
            logged_in: req.session.loggedIn,
            game,
            cheapData,
            cheapValue,
            hasRating,
            hasVideo,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
