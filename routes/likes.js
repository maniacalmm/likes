var express = require('express');
var router = express.Router();
var Likes = require("../models/likes");
var middleware = require("../middleware/index");

// INDEX route --> display all grounds
router.get('/', (req, res) => {
    console.log(req.query.search);
    var noMatch = "we've got nothing by that, yet :(";
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');

        Likes.find({name: regex}, (err, allLikes) => {
            if (err) console.log(err);
            else {
                if (allLikes.length > 0)
                    res.render("likes/index", {likes: allLikes, noMatch: ""});
                else
                    res.render("likes/index", {likes: allLikes, noMatch: noMatch});
            }
        });
    } else {
        Likes.find({}, (err, allLikes) => {
            if (err) console.log(err);
            else {
                res.render("likes/index", {likes: allLikes, noMatch: ""});
            }
        });
    }

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
        if (err || !foundLike) {
            req.flash("error", "like not found");
            res.redirect('/likes');
        } else {
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

// UPDATE number of likes on a certain like
// no signed in required
router.post("/:id/like", (req, res) => {
    console.log(req.body);
    console.log('you reached server post route');
    Likes.findById(req.params.id, (err, foundLike) => {
        if (err) console.log(err);
        else {
            if (!foundLike.like) foundLike.like = 0;

            if (req.body.turn === '0')
                foundLike.like = foundLike.like + 1;
            else
                foundLike.like = foundLike.like - 1;

            foundLike.save().then(() => {
                res.json(foundLike.like);
            });
        }
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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;