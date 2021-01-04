const router = require("express").Router();
const userRoutes = require("./userRoutes");
const apiCallRoutes = require("./apiCallRoutes");

router.use("/apiCall", apiCallRoutes);
// calls the userRoutes.js file and prefixes with /user
router.use("/user", userRoutes);

module.exports = router;
