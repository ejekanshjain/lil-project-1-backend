const express = require('express')
//const bcrypt = require('bcryptjs')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.use('/contactus', require('./ContactUs'))
router.use('/Demorequests', require('./demoRequests'))
router.use('/AdminPanelUsers', require('./adminPanelUsers'))
router.use('/login', require('./login'))

module.exports = router