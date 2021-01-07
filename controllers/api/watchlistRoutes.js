const router = require("express").Router();
const { Watchlist } = require("../../models");

// save a new game to watchlist route: api/watchlist/create
router.post("/create", async (req, res) => {
    try {
        const dbWatchData = await Watchlist.create({
            game_name: req.body.game_name,
            watchlist_user_id: req.session.user_id,
        });
        res.status(200).json(dbWatchData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// route: api/watchlist/delete/:id
router.delete("/delete/:id", async (req, res) => {
    try {
        const delWatchData = await Watchlist.destroy({
            where: { id: req.params.id },
        });
        res.status(200).json(delWatchData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
