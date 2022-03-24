const User = require('./User');
const Impair = require('./Impair');
const Suggestion = require('./Suggestion');
const Business = require('./Business');
const Rate = require('./Rate');

// Associations
User.hasMany(Impair, {
    foreignKey: 'user_id'
});
User.hasMany(Suggestion, {
    foreignKey: 'user_id'
})
Business.hasMany(Impair, {
    foreignKey: 'business_id'
})
Business.hasMany(Suggestion, {
    foreignKey: 'business_id'
})
Suggestion.belongsTo(Business, {
    foreignKey: 'business_id'
})
Suggestion.belongsTo(User, {
    foreignKey: 'user_id'
})


module.exports = { User, Impair, Suggestion, Business, Rate };