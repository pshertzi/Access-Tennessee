const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Suggestion extends Model {}

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
                allowNull: false,
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