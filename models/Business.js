const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Business extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, Business.password);
    }
}

Business.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        b_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        b_username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        b_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        b_password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }, 
        b_description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10]
            }
        },
        logo_url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newBusinessData) {
                newBusinessData.b_password = await bcrypt.hash(newBusinessData.b_password, 10);
                return newBusinessData;
            },
            async beforeUpdate(updatedBusinessData) {
                updatedBusinessData.b_password = await bcrypt.hash(updatedBusinessData.b_password, 10);
                return updatedBusinessData;
            }
        }, 
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'business'
    }
);

module.exports = Business;