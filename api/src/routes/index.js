const { Router } = require('express')
const router = Router()

router.use('/user', require('./user.js'))
router.use('/api', require('./api.js'))

module.exports = router