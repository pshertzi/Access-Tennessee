const { User } = require('../models');

const userData = [
    {
        first_name: 'John',
        last_name: 'Hays',
        username: 'johnhayes',
        email: 'johnhayes@email.com',
        password: 'thejohnhayes',
        description: 'My name is John Hayes and I am hearing impaired. I love to dine out and spend time with friends!',
        user_impairment: 'Hearing Impairment'
    },
    {
        first_name: 'Ronnie',
        last_name: 'Pennington',
        username: 'ronnie23',
        email: 'ronnie23@email.com',
        password: 'ronnie_pen',
        description: 'I love to go to concerts and listen to music!',
        user_impairment: 'Vision Impairment'
    },
    {
        first_name: 'Vanessa',
        last_name: 'Spears',
        username: 'VSpears',
        email: 'vanessas@email.com',
        password: 'purplecat24',
        description: 'My passion is art! I love going to galleries are town and seeing how creative the world can be!',
        user_impairment: 'Mobility Impairment'
    },
    {
        first_name: 'Janelle',
        last_name: 'Blake',
        username: 'janelle_B',
        email: 'janelleblake@email.com',
        password: 'janelle123',
        description: "Hi, I'm Janelle! I love to eat chocolate and play video games. One day, I'm going to visit every chocolate shop in Tennessee!",
        user_impairment: 'Neurological Impairment'
    },
    {
        first_name: 'Debra',
        last_name: 'Gentry',
        username: 'dgentry95',
        email: 'debragentry95@email.com',
        password: 'ilovecats!',
        description: 'I love cats! And playing games and going to amusement parks!',
        user_impairment: 'Cognitive Impairment'
    },
    {
        first_name: 'Colin',
        last_name: 'Blair',
        username: 'Colin_Blair',
        email: 'colinb@email.com',
        password: 'basketballislife',
        description: 'I love basketball! I go to all the Tennessee basketball games!',
        user_impairment: 'Medical Impairment'
    },
    {
        first_name: 'April',
        last_name: 'Case',
        username:  'aprilincase',
        email: 'aprilcase@email.com',
        password: 'april234',
        description: 'Sometimes its difficult to go outside, but I still want to try. I love going to parks and visiting museums!',
        user_impairment: 'Psychological Impairment'

    },
    {
        first_name: 'Wilma',
        last_name: 'Perkins',
        username: 'perkinsworld',
        email: 'wperkins@email.com',
        password: 'perkinsinternational',
        description: "My best friend is mobility impaired. We love to travel to places we've never been before and it's incredibly helpful to find the best, most accommodating places when traveling through the unknown!",
        user_impairment: 'None'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;