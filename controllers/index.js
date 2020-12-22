const router = require("express").Router();
const apiRoutes = require("./api");

// calls the index in the api folder and prefixes all routes with /api
router.use("/api", apiRoutes);

module.exports = router;
