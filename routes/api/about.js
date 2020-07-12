const express = require('express')

const { checkUserAuthenticated } = require('../../middlewares')
const { About } = require('../../models')

const router = express.Router()

router.get('/', async (req, res) => {

})

module.exports = router