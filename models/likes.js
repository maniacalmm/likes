var mongoose = require('mongoose');

var likeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    like: {type: Number, default: 0},
    author: {
        id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});


module.exports = mongoose.model('Campground', likeSchema);
