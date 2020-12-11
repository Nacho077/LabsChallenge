require('dotenv').config()
const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    logging: false,
    native: false
})
const basename = path.basename(__filename)
const modelDefiners = []

fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'))
    .forEach(file => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)))
    })

modelDefiners.forEach(model => model(sequelize))
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Product, Attribute, Search, User } = sequelize.models

Product.hasMany(Attribute)
Attribute.belongsTo(Product)

Search.hasMany(Product)
Product.belongsTo(Search)

Search.hasMany(Attribute)
Attribute.belongsTo(Search)

User.belongsToMany(Product, {through: 'favs'})
Product.belongsToMany(User, {through: 'favs'})

module.exports = {
    ...sequelize.models,
    conn: sequelize
}