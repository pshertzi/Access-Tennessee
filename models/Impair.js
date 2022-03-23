const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Impair extends Model {}

Impair.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        impairment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'impair'
    }
);

module.exports = Impair;