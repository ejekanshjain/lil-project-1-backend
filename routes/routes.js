const express = require('express')
//const bcrypt = require('bcryptjs')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.use('/contactus', require('./ContactUs'))
router.use('/Demorequests', require('./demoRequests'))
router.use('/AdminPanelUsers', require('./adminPanelUsers'))
<<<<<<< HEAD
router.use('/login', require('./login'))
=======
router.use('/Login', require('./login'))

>>>>>>> df9951ef084f59e8bf4c9db3b82cf9abeb974c02
module.exports = router