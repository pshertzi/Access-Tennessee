const User = require('./User');
const Impair = require('./Impair');
const Suggestion = require('./Suggestion');
const Business = require('./Business');
const Rate = require('./Rate');

// Associations
User.hasMany(Impair)  


module.exports = { User, Impair, Suggestion, Business, Rate };