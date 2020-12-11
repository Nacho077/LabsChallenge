const { DataTypes } = require('sequelize')

module.exports = sequelize => {
    sequelize.define('search', {
        name: {
            type: DataTypes.STRING
        },
        total_products:{
            type: DataTypes.INTEGER
        }
    })
}