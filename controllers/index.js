const router = require("express").Router();
const apiRoutes = require("./api");
const landingPages = require("./landingPages.js");

router.use("/", landingPages);
// calls the index in the api folder and prefixes all routes with /api
router.use("/api", apiRoutes);

module.exports = router;
