const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Suggestion extends Model {
    static upvote(body, models) {
        return models.Vote.create({
          user_id: body.user_id,
          suggestion_id: body.suggestion_id
        }).then(() => {
          return Suggestion.findOne({
            where: {
              id: body.suggestion_id
            },
            attributes: [
              'id',
              'suggestion_text',
              'created_at',
              [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE suggestion.id = vote.suggestion_id)'), 'vote_count']
            ],
            include: [
              {
                model: models.Comment,
                attributes: ['id', 'comment_text', 'suggestion_id', 'user_id', 'created_at'],
                include: {
                  model: models.User,
                  attributes: ['username']
                }
              }
            ]
          });
        });

    }
}

Suggestion.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        suggestion_text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        business_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'business',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'suggestion'
    }
);

module.exports = Suggestion;