
var express = require('express');
var router = express.Router({mergeParams: true});
var Likes = require("../models/likes");
var Comment = require("../models/comments");
var middleware = require("../middleware");

//===================
// COMMENTS ROUTES
//===================

// CREATE ROUTE
router.get('/new', middleware.isLoggedIn,(req, res) => {
    // find campground by id
    Likes.findById(req.params.id, (err, like) => {
        if (err) console.log(err);
        else {
            res.render('comments/new', {like: like});
        }
    });
});

router.post('/', middleware.isLoggedIn, (req, res) => {
    // lookup campgrounds using iD
    Likes.findById(req.params.id, (err, like) => {
        if (err) {
            console.log(err);
            res.redirect('/likes');
        } else {
            //create new comment
            Comment.create(req.body.comment, (err, comment) => {
                if (err) console.log(err);
                else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // connect new comment to campground
                    like.comments.push(comment._id);
                    like.save().then(() => {
                    // redirect campgroung show page
                    req.flash("success", "comment added! :)");
                    res.redirect('/likes/' + like._id);
                    });

                }
            });
        }
    });
});


// UPDATE ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership,(req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("./comments/edit", {like_id: req.params.id, comment: foundComment});
        }
    });
});

router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,(err, comment) => {
       if (err) res.redirect("back");
       else {
           res.redirect("/likes/" + req.params.id);
       }
    });
});

// DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    // findIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, err => {
        if (err) res.redirect("back");
        else {
            req.flash("success", "comment deleted! :)");
            res.redirect("/likes/" + req.params.id);
        }
    });
});

module.exports = router;