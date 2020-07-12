const express = require('express')

const { checkUserAuthenticated } = require('../../middlewares')
const { Curator } = require('../../models')

const router = express.Router()

router.get('/', async (req, res) => {

})

module.exports = router