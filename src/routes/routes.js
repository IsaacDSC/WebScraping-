const express = require('express')
const router = express.Router()
const APP = require('../app')

router.get('/', (req, res) => {
    res.render('home/home', { APP: APP.main() })
})


module.exports = router