const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.use('/contactus', require('./ContactUs'))
router.use('/DemoRequest', require('./demoRequests'))
router.use('/adminpanelusers', require('./adminPanelUsers'))

module.exports = router