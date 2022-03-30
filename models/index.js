const User = require('./User');
const Impair = require('./Impair');
const Suggestion = require('./Suggestion');
const Business = require('./Business');
const Vote = require('./Vote');
const Contact = require('./Contacts');
const Comment = require('./Comment');
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

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
Comment.belongsTo(Suggestion, {
    foreignKey: 'suggestion_id',
    onDelete: 'SET NULL'
  });
  
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });
  
Suggestion.hasMany(Comment, {
    foreignKey: 'suggestion_id'
  });

User.belongsToMany(Suggestion, {
    through: Vote,
    as: 'voted_suggestions',
    foreignKey: 'user_id'
  });
Suggestion.belongsToMany(User, {
    through: Vote,
    as: 'voted_suggestions',
    foreignKey: 'suggestion_id'
});
Vote.belongsTo(User, {
  foreignKey: 'user_id'
});

Vote.belongsTo(Suggestion, {
  foreignKey: 'suggestion_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Suggestion.hasMany(Vote, {
  foreignKey: 'suggestion_id'
});
  

module.exports = { User, Impair, Suggestion, Business, Vote, Contact, Comment};