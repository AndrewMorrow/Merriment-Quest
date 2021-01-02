const router = require("express").Router();
const { User } = require(".././models");
const withAuth = require("../utils/auth");

//           Home Page
// Get all blogs from the database
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
        // get all blogs from db here
        const dbUserData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["user_password"] },
            include: [{ model: Blog }],
        });

        // console.log(dbBlogData);

        const userData = dbUserData.get({ plain: true });
        // console.log(blogs);
        // console.log(userData);
        // console.log(req.session.loggedIn);
        res.render("dashboard", {
            ...userData,
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

module.exports = router;
