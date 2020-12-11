const server = require('express').Router()
const user = require('../controller/user.js')

server.get('/', (req, res) => {
    user.getUser()
    .then(r => res.send(r))
    .catch(err => console.log(err))
})

server.post('/register', (req, res) => {
    const { email, password } = req.body
    if(!email){
        return res.status(400).send('I need a email to registrate a new user')
    }
    if(!password){
        return res.status(400).send('I need a password to registrate a new user')
    }
    user.register(req.body)
    .then(r => res.send(r))
    .catch(err => console.log(err))
})

server.post('/login', (req, res) => {
    const { email, password } = req.body
    if(!email) return 'I need a email to log a user'
    if(!password) return 'I need a password to log a user'
    user.getUser(email, password)
    .then(r => res.send(r))
    .catch(err => console.log(err))
})

server.post('/addfav', (req, res) => {
    user.addFav(req.body)
    .then(r => res.send(r))
    .catch(err => console.log(err))
})

server.post('/removefav', (req, res) => {
    user.removeFav(req.body)
    .then(r => res.send(r))
    .catch(err => console.log(err))
})

server.get('/email/:email', (req, res) => {
    user.existEmail(req.params)
    .then(r => res.send(r))
})

module.exports = server