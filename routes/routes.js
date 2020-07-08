const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.use('/contactus', require('./ContactUs'))
router.use('/demorequests', require('./demoRequests'))
router.use('/AdminPanelUsers', require('./adminPanelUsers'))

module.exports = router