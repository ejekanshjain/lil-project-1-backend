const express = require('express')

const { checkUserAuthenticated } = require('../../middlewares')
const { About } = require('../../models')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const about = req.query.all === 'true' ? await About.find().sort({ createdAt: -1 }) : await About.find().sort({ createdAt: -1 }).limit(1)
        res.json({
            status: 200,
            success: true,
            data: {
                about: req.query.all === 'true' ? about : about[0]
            }
        })
    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', err)
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Something Went Wrong!'
        })
    }
})

router.post('/', checkUserAuthenticated, async (req, res) => {
    const { whatAreWe, whatWereWe, whatWeDo } = req.body
    if (!whatAreWe)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'What are We is required!'
        })
    if (!whatWereWe)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'What Were We is required!'
        })
    if (!whatWeDo)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'What We Do is required!'
        })
    try {
        const about = await About.create({
            whatAreWe,
            whatWereWe,
            whatWeDo
        })
        res.status(201).json({
            status: 201,
            success: true,
            message: 'Added Successfully!',
            data: {
                about
            }
        })
    } catch (err) {
        console.log('\x1b[31m%s\x1b[0m', err)
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Something Went Wrong!'
        })
    }
})

module.exports = router