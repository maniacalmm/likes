var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Likes = require("../models/likes")

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
        new User({
            username: req.body.username,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            avatar: req.body.avatar,
            email: req.body.email
        }),
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

// USER PROFILE
router.get("/users/:id", (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if (err) {
            req.flash("error", "something went wrong, try again");
            res.redirect("/");
        }
        Likes.find().where('author.id').equals(foundUser._id).exec((err, likes) => {
            res.render("users/show", {user: foundUser, likes: likes});
        });
    })
});

module.exports = router;