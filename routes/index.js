var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get('/', (req, res) => {
    res.render('landing');
});

// =======
// AUTH routes
// =======
router.get('/register', (req, res) => {
    res.render('register');
});

// sign up routes
router.post('/register', (req, res) => {
    User.register(
        new User({username: req.body.username}),
        req.body.password,
        (err, user) => {
            if (err) {
                console.log(err);
                var msg = err.message;
                req.flash("error", msg);
                return res.redirect('register');
            }
            passport.authenticate('local')(req, res, () => {
                req.flash("success", "welcome! " + user.username);
                res.redirect('/likes');
            });
        });
});

// show login form

router.get('/login', (req, res) => {
    res.render('login'); 
});

// login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/likes',
    failureRedirect: '/login'
    }), (req, res) => {}
);

//log out route
router.get('/logout', (req, res) => {
    req.logout();
    req.flash("success", "you're logged sout");
    res.redirect('/likes');
});

module.exports = router;