// all the middleware goes here
var Likes = require("../models/likes");
var Comment = require("../models/comments");

var middlewareObj = {
    checkLikeOwnership: function(req, res, next) {
            if (req.isAuthenticated()) {
                Likes.findById(req.params.id, (err, foundLike) => {
                    if (err || !foundLike) {
                        req.flash("error", "like not found");
                        res.redirect("back");
                    } else {
                        if (foundLike.author.id.equals(req.user._id)) {
                            next(); // cool, spirit of middleware
                        } else {
                            req.flash("error", "you don't have permission to do that");
                            res.redirect("back");
                        }
                    }
                });
            } else {
                req.flash("error", "You need to be logged in to do that");
                res.redirect("back"); // cool
            }
    },

    checkCommentOwnership: function(req, res, next) {
            if (req.isAuthenticated()) {
                Comment.findById(req.params.comment_id, (err, foundComment) => {
                    if (err) {
                        res.redirect("back");
                    } else {
                        if (foundComment.author.id.equals(req.user._id)) {
                            next(); // cool, the spirit of middleware
                        } else {
                            res.redirect("back");
                        }
                    }
                });
            } else {
                res.redirect("back"); // cool
            }
    },

    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You need to be logged in to do that :(");
        res.redirect('/login');
    }
};


module.exports = middlewareObj;