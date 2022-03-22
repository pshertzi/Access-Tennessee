const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rate extends Model {}

Rate.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
            allowNull: false,
            references: {
                model: 'business',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'rate'
    }
);

module.exports = Rate;