const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema({
    Username: String,
    password: String,
    avatar: String,
    firstName: String,
    lastName: String,
    email:String
});

UserSchema.plugin(passportLocalMongoose); // User.register method

module.exports = mongoose.model('User', UserSchema);