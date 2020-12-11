const { DataTypes } = require('sequelize')

module.exports = sequelize => {
    sequelize.define('attribute', {
        name: {
            type: DataTypes.STRING
        },
        value: {
            type: DataTypes.STRING
        },
    })
}