const express = require('express')

const { checkUserAuthenticated } = require('../../middlewares')
const { TeamMember } = require('../../models')

const router = express.Router()

router.get('/', async (req, res) => {

})

module.exports = router