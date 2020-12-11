const { DataTypes } = require('sequelize')

module.exports = sequelize => {
    sequelize.define('user', {
        email:{
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: "Email address already in use"
            },
            validate: {
                isEmail: true,
                notEmpty : true
            }
        },
        password: {
            type: DataTypes.STRING(30)
        }
    })
}