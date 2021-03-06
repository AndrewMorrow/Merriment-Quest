const router = require("express").Router();
const dotenv = require("dotenv");
const { User, Watchlist } = require(".././models");
const withAuth = require("../utils/auth");
const axios = require("axios");
const _ = require("lodash/core");
dotenv.config();

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
        // console.log(watchData);

        if (_.isEmpty(watchData.watchlists)) {
            watchData = false;
        }

        // console.log(watchData);

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
        const storeInfo = [];
        // console.log(req.query.title);

        rawgParams.search = req.query.title;

        const rawgConfig = {
            url: `games?page_size=1&search_precise=1&key=${process.env.RAWG_API_KEY}`,
            method: "GET",
            baseURL: "https://api.rawg.io/api",
            params: rawgParams,
        };
        const apiGameData = await axios.request(rawgConfig);
        const game = apiGameData.data.results[0];
        // console.log(game);

        // console.log(gameTitle);

        if (game === undefined) {
            const errMessage = "There was not a game found with that name.";
            res.render("errGamePage", {
                errMessage,
            });
        } else {
            if (game.ratings === null) {
                hasRating = false;
            }

            if (_.isEmpty(game.ratings)) {
                hasRating = false;
            }

            if (_.isEmpty(game.clip)) {
                // console.log("data is empty");
                hasVideo = false;
            }
            const gameTitle = game.name.trim();
            const cheapConfig = {
                url: `/deals?title=${gameTitle}&sortBy=Title&sortBy=Price&exact=1&limit=1&onSale=1`,
                method: "GET",
                baseURL: "https://www.cheapshark.com/api/1.0",
            };
            const apiCheapData = await axios.request(cheapConfig);
            const cheapData = apiCheapData.data;

            // console.log(cheapData);

            // console.log(storeInfo);

            const cheapStoreConfig = {
                url: "/stores",
                method: "GET",
                baseURL: "https://www.cheapshark.com/api/1.0",
            };

            const apiCheapStoreData = await axios.request(cheapStoreConfig);

            const cheapStores = apiCheapStoreData.data;
            // console.log(cheapStores);

            cheapData.forEach((deal) => {
                const storeObj = {
                    storeID: deal.storeID,
                };
                storeInfo.push(storeObj);
            });

            cheapStores.forEach((store) => {
                storeInfo.forEach((item) => {
                    if (store.storeID === item.storeID) {
                        // console.log(store.storeName);
                        // item.storeName = store.storeName;
                        item.storeName = store.storeName;
                    }
                });
            });

            cheapData.forEach((deal, i) => {
                deal.storeName = storeInfo[i].storeName;
            });

            // console.log(cheapData);
            // console.log(storeInfo);

            if (_.isEmpty(cheapData)) {
                // console.log("data is empty");
                cheapValue = false;
            }

            res.render("gameView", {
                logged_in: req.session.loggedIn,
                game,
                cheapData,
                cheapValue,
                hasVideo,
                hasRating,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// route: /gameDealFiner
router.get("/gameDealFinder", async (req, res) => {
    try {
        let rawgParams = {};
        let cheapValue = true;
        let hasVideo = true;
        let hasRating = true;
        const storeInfo = [];

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
            url: `games?page_size=30&ordering=-metacritic&key=${process.env.RAWG_API_KEY}`,
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

        const gameTitle = game.name.trim();

        const cheapConfig = {
            url: `/deals?title=${gameTitle}&sortBy=Title&sortBy=Price&exact=1&limit=1&onSale=1`,
            method: "GET",
            baseURL: "https://www.cheapshark.com/api/1.0",
        };

        const apiCheapData = await axios.request(cheapConfig);
        const cheapData = apiCheapData.data;

        const cheapStoreConfig = {
            url: "/stores",
            method: "GET",
            baseURL: "https://www.cheapshark.com/api/1.0",
        };

        const apiCheapStoreData = await axios.request(cheapStoreConfig);

        const cheapStores = apiCheapStoreData.data;
        // console.log(cheapStores);

        cheapData.forEach((deal) => {
            const storeObj = {
                storeID: deal.storeID,
            };
            storeInfo.push(storeObj);
        });

        cheapStores.forEach((store) => {
            storeInfo.forEach((item) => {
                if (store.storeID === item.storeID) {
                    // console.log(store.storeName);
                    // item.storeName = store.storeName;
                    item.storeName = store.storeName;
                }
            });
        });

        cheapData.forEach((deal, i) => {
            deal.storeName = storeInfo[i].storeName;
        });

        // console.log(storeInfo);
        // console.log(apiCheapData);
        // console.log(cheapData);

        if (cheapData.length === 0) {
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
