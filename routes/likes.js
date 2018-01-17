var express = require('express');
var router = express.Router();
var Likes = require("../models/likes");
var middleware = require("../middleware/index");

// INDEX route --> display all grounds
router.get('/', (req, res) => {
    Likes.find({}, (err, allLikes) => {
        if (err) console.log(err);
        else {
            res.render("likes/index", {likes: allLikes});
        }
    });
});

// CREATE route --> create new camp
router.post('/', middleware.isLoggedIn, (req, res) => {
    // get data from form
    // add to campgrounds array
    // redirect to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newLike = {name: name, image: image, description: desc, author: author};
    console.log(req.user);

    //create a new campground and save to database
    Likes.create(newLike, (err, item) => {
        if (err) console.log(err);
        else {
            res.redirect('/likes'); //default redirect is a GET request
        }
    });
});

// NEW route  --> show form to create new ground
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('likes/new');
});

// SHOW route
router.get('/:id', (req, res) => {
    //find the campground with provided id
    // render show template with that camp's info
    Likes.findById(req.params.id).populate('comments').exec((err, foundLike) => {
        if (err)
            console.log(err);
        else {
            res.render('likes/show', {data: foundLike});
        }
    });
});


// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkLikeOwnership, (req, res) => {
    Likes.findById(req.params.id, (req, foundLike) => {
        res.render("likes/edit", {like: foundLike});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkLikeOwnership, (req, res) => {
    // find and update the campground
    Likes.findByIdAndUpdate(req.params.id, req.body.like, (err, updated) => {
        if (err) res.redirect("/likes");
        else {
            res.redirect("/likes/" + req.params.id);
        }
    });
});

// DESTROY route
router.delete("/:id", middleware.checkLikeOwnership,(req, res) => {
    Likes.findByIdAndRemove(req.params.id, (err, removedItem) => {
        if (err) res.redirect("/likes");
        else {
            req.flash("success", "like deleted:)");
            res.redirect("/likes");
        }
    })
});

module.exports = router;