const User = require('./User');
const Impair = require('./Impair');
const Suggestion = require('./Suggestion');
const Business = require('./Business');
const Rate = require('./Rate');
const Contact = require('./Contacts');
// Associations
User.hasMany(Impair);
Impair.belongsTo(User);





module.exports = { User, Impair, Suggestion, Business, Rate, Contact};