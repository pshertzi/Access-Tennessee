const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Contacts extends Model {}


Contacts.init (
    {
        c_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        c_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        c_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true }
        },
        c_msg: {
            type: DataTypes.STRING,
            allowNull: false,
        
    },
    
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'contacts'
}
)

module.exports = Contacts;