const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index.js')
require('./db.js')

const server = express()

server.name = "API"
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
server.use(bodyParser.json({ limit: '50mb' }))
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONT_URL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
server.use('/', routes)



server.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send(err.message)
})

module.exports = server