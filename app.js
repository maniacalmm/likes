var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Likes       = require('./models/likes'),
    seedDB      = require('./seeds'),
    Comment     = require('./models/comments'),
    passport    = require('passport'),
    LocalStrategy = require('passport-local'),
    User        = require('./models/user'),
    passportLocalMongoose = require('passport-local-mongoose'),
    flash       = require("connect-flash"),
    methodOverride = require("method-override");


//============
// Router importing
//============
var commentsRoutes      = require("./routes/comments"),
    likesRoutes    = require("./routes/likes"),
    indexRoutes         = require("./routes/index");

// seedDB();

mongoose.connect('mongodb://localhost/CampCamp_9');

// middleware
app.use(bodyParser.urlencoded({extended: true})); // to parse the post body
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG

app.use(require('express-session')({
    secret: 'Onec again Rusty wins cutest dog',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// navbar middleware // order matters, this will work
// only if it's put here
app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
    next();
});


app.use("/", indexRoutes);
app.use("/likes", likesRoutes);
app.use("/likes/:id/comments", commentsRoutes);

app.listen(8000, (err) => {
    if (err) console.log(err);
    else console.log('Like serving!!');
});