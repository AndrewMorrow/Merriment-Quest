const router = require("express").Router();
const { User } = require("../../models");

// route: /api/user/
router.post("/", async (req, res) => {
    try {
        // console.log(req.body);
        const dbUserData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.loggedIn = true;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// route: api/user/login
router.post("/login", async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: { user_name: req.body.user_name },
        });
        // console.log(dbUserData);
        if (!dbUserData) {
            res.status(400).json({
                message: "Incorrect email or password, please try again",
            });
            return;
        }

        const validPassword = await dbUserData.checkPassword(
            req.body.user_password
        );

        if (!validPassword) {
            res.status(400).json({
                message: "Incorrect email or password, please try again",
            });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: "You are now logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// route: api/user/logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
