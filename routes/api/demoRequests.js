const express = require('express')

const { checkUserAuthenticated } = require('../../middlewares')
const { DemoRequest } = require('../../models')

const router = express.Router()

router.get('/', checkUserAuthenticated, async (req, res) => {
    try {
        const demoRequests = await DemoRequest.find()
        res.json({
            status: 200,
            success: true,
            data: {
                demoRequests
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

router.get('/:id', checkUserAuthenticated, async (req, res) => {
    try {
        const demoRequest = await DemoRequest.findOne({
            _id: req.params.id
        })

        if (!demoRequest)
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Object Not Found!'
            })

        res.json({
            status: 200,
            success: true,
            data: {
                demoRequest
            }
        })
    } catch (err) {
        if (err.name === 'CastError')
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Invalid Object Id!'
            })
        console.log('\x1b[31m%s\x1b[0m', err)
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Something Went Wrong!'
        })
    }
})

router.post('/', async (req, res) => {
    const { email, message } = req.body
    if (!email)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Email is required!'
        })
    try {
        const demoRequest = await DemoRequest.create({
            email,
            message
        })
        res.status(201).json({
            status: 201,
            success: true,
            message: 'Added Successfully!',
            data: {
                demoRequest
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