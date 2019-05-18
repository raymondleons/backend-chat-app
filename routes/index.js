const express = require('express')
const router = express.Router()

const API = require('./api/index')

router.use('/API', API)

module.exports = router