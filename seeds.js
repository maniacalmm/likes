var mongoose = require('mongoose'),
    Campground = require('./models/likes'),
    Comment = require('./models/comments');


var data = [
    {name: 'cloud\'s rest',
    image: 'https://images.unsplash.com/photo-1435777940218-be0b632d06db?auto=format&fit=crop&w=1189&q=80',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },

    {
    name: 'cheif\'s rest',
    image:'https://images.unsplash.com/photo-1495137215671-61b3f15aedb0?auto=format&fit=crop&w=750&q=80',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },

    {
    name: 'some trees',
    image:'https://images.unsplash.com/uploads/1413142095961484763cf/d141726c?auto=format&fit=crop&w=750&q=80',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, (err) => {
        // if (err) console.log(err);
        // else {
        //     //add a few campgrounds
        //     console.log('removed campgrounds');
        //     data.forEach((seed) => {
        //         Campground.create(seed, (err, campground) => {
        //             if (err) console.log(err);
        //             else {
        //                 // add a few comments
        //                 console.log('added campground');
        //                 Comment.create(
        //                     {
        //                         text: 'this place is greate, but I wish there are internets',
        //                         author: 'Bill Hader'
        //                     }, (err, comment) => {
        //                         if (err) console.log(err);
        //                         else {
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log('comment added');
        //                         }
        //                     });
        //             }
        //         });
        //     });
        // }
    });



    //add a few comments
}

module.exports = seedDB;


