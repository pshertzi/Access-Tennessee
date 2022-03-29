const { Business } = require('../models');

const businessData = [
    {
        b_name: 'Exhibor',
        b_username: 'exhibor',
        b_email: 'exhibor@email.com',
        b_password: 'exhibor123',
        b_description: 'Exhibor is a locally owned art exhibit that celebrates artist from the area and around the world. We would love you to stop by!',
    },
    {
        b_name: 'Fooduro',
        b_username: 'fooduro',
        b_email: 'fooduro@email.com',
        b_password: 'we_love_food',
        b_description: 'Fooduro is a new restaurant in town that provides outdoor seating and a great atmosphere to all!'
    },
    {
        b_name: 'TuneKey',
        b_username: 'tunekeyshop',
        b_email: 'tunekeyshop@email.com',
        b_password: 'tune_in!',
        b_description: "TuneKey is a local recording studio/ record store. Find all the newest, hottest releases from your favorite artists here!"
    },
    {
        b_name: 'Choconut',
        b_username: 'choconut',
        b_email: 'choconut@email.com',
        b_password: 'notchochoconut',
        b_description: 'We are Choconut! Are you nuts about chocolate? We are too! Come see us today!'
    },
    {
        b_name: 'Major Thrill',
        b_username: 'majorthrill',
        b_email: 'majorthrillpark@email.com',
        b_password: 'mayubmajor',
        b_description: 'Major Thrill is an amusement park right outside of town! We specialize in fun rides and arcade games. Come on down and remember to make your day MAJOR!'
    },
    {
        b_name: 'Athletic.ly',
        b_username: 'athletic.ly',
        b_email: 'athletic.ly@email.com',
        b_password: 'weloveathletes',
        b_description: "We love all athletes here at Athletic.ly. We are your one stop shop for all the best gear for whatever sport you're into. Come see us today!"
    },
    {
        b_name: 'Life Time Gallery',
        b_username: 'LTGallery',
        b_email: 'ltgallery@email.com',
        b_password: 'theltgalery',
        b_description: "Life Time Gallery is a museum filled with art from around the world and throughout time. Our pieces are all one of a kind. Prepare to be amazed!"
    }
]

const seedBusiness = () => Business.bulkCreate(businessData, {individualHooks: true});

module.exports = seedBusiness;