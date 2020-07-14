const express = require('express')

const router = express.Router()

router.get('/', (req, res) =>
    res.json({
        status: 200,
        success: true,
        message: 'API Server Up and Running!'
    }))

router.use('/admin', require('./admin'))
router.use('/demorequests', require('./demoRequests'))
router.use('/contactus', require('./contactUs'))
router.use('/testimonials', require('./testimonials'))
router.use('/courses', require('./courses'))
router.use('/about', require('./about'))
router.use('/contactdetails', require('./contactDetails'))
router.use('/gallery', require('./gallery'))
router.use('/teammembers', require('./teamMembers'))
// router.use('/bot', require('./botService'))

module.exports = router