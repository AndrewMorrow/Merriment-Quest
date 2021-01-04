const router = require("express").Router();
const axios = require("axios");
// const Rawger = require("rawger");

// route: api/apiCall/rawgGameSearch
router.post("/rawgGameSearch", async (req, res) => {
    try {
        const config = {
            url:
                "games?platforms=4,1,3,2&genres=strategy&tags=singleplayer&page_size=1&ordering=-metacritic",
            method: "GET",
            baseURL: "https://api.rawg.io/api",
        };
        const apiGameData = await axios.request(config);
        const apiGames = apiGameData.data.results;
        console.log(apiGames);
        res.status(200).json(apiGames);

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

module.exports = router;
