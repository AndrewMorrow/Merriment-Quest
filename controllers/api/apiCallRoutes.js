const router = require("express").Router();
const axios = require("axios");
// const Rawger = require("rawger");

// route: api/apiCall/rawgGameSearch
router.post("/rawgGameSearch", async (req, res) => {
    try {
        const config = {
            url:
                "games?platforms=4,1,3,2&genres=strategy&tags=singleplayer&page_size=10&ordering=-metacritic",
            method: "GET",
            baseURL: "https://api.rawg.io/api",
        };
        const apiGameData = await axios.request(config);
        const apiGamesLen = apiGameData.data.results.length;
        const apiGames = apiGameData.data.results;
        console.log(apiGamesLen);
        const randNum = function getRandNum(maxNum) {
            return Math.floor(Math.random() * Math.floor(maxNum));
        };
        const randomGame = apiGames[randNum(apiGamesLen)];
        console.log(randomGame);
        res.render("gameView", {
            logged_in: req.session.loggedIn,
            randomGame,
        });

        // testing rawger npm package
        // const rawger = await Rawger();
        // const { games } = rawger;
        // const apiGames = (
        //     await games.search(
        //         "platforms=4,1,3,2&genres=strategy&tags=singleplayer&page_size=1"
        //     )
        // ).get();
        // console.log(apiGames);
        // res.status(200).json(apiGames);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// route: api/apiCall/cheapsharkSearch
router.post("/cheapsharkSearch", async (req, res) => {
    try {
        const gameTitle = req.body.gameTitle;

        const config = {
            url: `/deals?title=${gameTitle}&sortBy=Title&limit=1&storeID=1,2,3,7,11&onSale=1`,
            method: "GET",
            baseURL: "https://www.cheapshark.com/api/1.0",
        };
        const apiGameData = await axios.request(config);
        const apiGames = apiGameData.data;
        console.log(apiGames);
        res.status(200).json(apiGames);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
