const { DataTypes } = require('sequelize')

module.exports = sequelize => {
    sequelize.define('product', {
        name: {
            type: DataTypes.STRING
        },
        pais: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        prov: {
            type: DataTypes.STRING
        },
        condition: {
            type: DataTypes.STRING
        },
        currency_id: {
            type: DataTypes.STRING
        },
        available_quantity: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.INTEGER
        },
        seller_reputation_level: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING
        },
        acept_MP: {
            type: DataTypes.BOOLEAN
        },
        product_id: {
            type: DataTypes.STRING
        },
        seller_id: {
            type: DataTypes.INTEGER
        },
        sold_quantity: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.TEXT
        }
    })
}