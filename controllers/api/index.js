const router = require("express").Router();
const userRoutes = require("./userRoutes");
const watchlistRoutes = require("./watchlistRoutes");

router.use("/watchlist", watchlistRoutes);
// calls the userRoutes.js file and prefixes with /user
router.use("/user", userRoutes);

module.exports = router;
