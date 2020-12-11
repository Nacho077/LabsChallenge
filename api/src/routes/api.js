const server = require('express').Router()
const api = require('../controller/api')
const { cache } = require('../middleware/cache')

server.get('/search', cache(60 * 60), (req, res) => {
    const {q, offset, finalSet} = req.query
    api.addSearch(q, offset, finalSet)
    .then(r => res.send(r))
    .catch(err => console.log(err))
})

server.get('/categories', cache(60 * 60), (req, res) => {
    api.getCategories()
    .then(r => res.send(r))
    .catch(err => console.log(err))
})

server.get('/product', cache(60 * 60), (req, res) => {
    const {productId} = req.query
    api.getProduct(productId)
    .then(r => res.send(r))
    .catch(err => console.log(err))
})

server.get('/category', cache(60 * 60), (req, res) => {
    const { id, offset, finalSet } = req.query
    api.readCats(id, offset, finalSet)
    .then(r => res.send(r))
    .catch(err => console.log(err))
})

module.exports = server