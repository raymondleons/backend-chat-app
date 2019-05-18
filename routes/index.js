const express = require('express')
const router = express.Router()

const API = require('./api/index')

router.use('/API', API)
router.get('/', (req, res)=>{
    res.send('walla')
})
module.exports = router