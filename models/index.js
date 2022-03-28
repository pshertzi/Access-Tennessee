const User = require('./User');
const Impair = require('./Impair');
const Suggestion = require('./Suggestion');
const Business = require('./Business');
const Rate = require('./Rate');
const Contact = require('./Contacts');
const Comment = require('./Comment');
// Associations
User.hasMany(Suggestion, {
    foreignKey: 'user_id'
});
Suggestion.belongsTo(User, {
    foreignKey: 'user_id',
});
User.belongsToMany(Suggestion, {
    through: Rate,
    as: 'rates_suggestions',
    foreignKey: 'user_id'
});
Suggestion.belongsToMany(User, {
    through: Rate,
    as: 'rated_suggestions',
    foreignKey: 'suggested_id'
});
Rate.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Rate.belongsTo(Suggestion, {
    foreignKey: 'suggestion_id'
  });
  
User.hasMany(Rate, {
    foreignKey: 'user_id'
  });
  
Suggestion.hasMany(Rate, {
    foreignKey: 'suggestion_id'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Comment.belongsTo(Suggestion, {
    foreignKey: 'suggestion_id'
  });
  
User.hasMany(Comment, {
    foreignKey: 'user_id'
  });
  
Suggestion.hasMany(Comment, {
    foreignKey: 'suggestion_id'
  });
  

User.hasMany(Impair);
Impair.belongsTo(User);





module.exports = { User, Impair, Suggestion, Business, Rate, Contact, Comment};