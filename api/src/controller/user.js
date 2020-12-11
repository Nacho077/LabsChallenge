const { User, Product, favs } = require('../db.js')

function getUser(email, password){
    return User.findOne({
        where: {
            email,
            password
        },
        attributes: ['email', 'id'],
        include: {
            model: Product,
            attributes: [
                'name',
                'pais',
                'city',
                'prov',
                'condition',
                'currency_id',
                'available_quantity',
                'price',
                'seller_reputation_level',
                'img',
                'sold_quantity',
                'product_id',
                'id'
            ],
            through: {
                attributes: []
            }
        }
    })
}

function register({email, password}){
    return User.findOne({
        where: {
            email
        }
    })
    .then((r) => {
        if(r === null) return this.createUser(email, password)
        else return 'Ya hay un usuario registrado con este email'
    })
}

function createUser(email, password){
    return User.create({
        email,
        password
    })
    .then(() => this.getUser(email, password))
}

function addFav({userId, productId}){
    const userPromise = User.findOne({
        where: {
            id: userId
        }
    })
    const productPromise = Product.findOne({
        where: {
            id: productId
        }
    })
    return Promise.all([userPromise, productPromise])
    .then(([user, product]) => {
        return user.addProduct(product)
    })
    .then((r) => this.getfavs(r[0].userId))
}

function getfavs(userId){
    return User.findOne({
        where: {
            id: userId
        },
        attributes: ['id'],
        include: {
            model: Product,
            attributes: [
                'name',
                'pais',
                'city',
                'prov',
                'condition',
                'currency_id',
                'available_quantity',
                'price',
                'seller_reputation_level',
                'img',
                'sold_quantity',
                'product_id',
                'id'
            ]  
        }
    })
}

function existEmail({email}){
    return User.findOne({
        where: {
            email
        },
        attributes: ['email']
    })
}

function removeFav({userId, productId}){
    const userPromise = User.findOne({
        where: {
            id: userId
        }
    })
    const productPromise = Product.findOne({
        where: {
            id: productId
        }
    })
    return Promise.all([userPromise, productPromise])
    .then(([user, product]) => {
        return user.removeProduct(product)
    })
    .then(() => this.getfavs(userId))
}


module.exports = {
    getUser,
    register,
    createUser,
    addFav,
    getfavs,
    existEmail,
    removeFav
}