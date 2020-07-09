const express = require('express')

const { checkUserAuthenticated } = require('../../middlewares')
const { Contact } = require('../../models')

const router = express.Router()

router.get('/', checkUserAuthenticated, async (req, res) => {
    try {
        const contactUs = await Contact.find()
        res.json({
            status: 200,
            success: true,
            data: {
                contactUs
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
        const contactus = await Contact.findOne({
            _id: req.params.id
        })

        if (!contactus)
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Object Not Found!'
            })

        res.json({
            status: 200,
            success: true,
            data: {
                contactus
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
    const { name, email, subject, message } = req.body
    if (!name || !email || !subject || !message)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Name, Email, Subject & Message is required!'
        })
    try {
        const contactUs = await Contact.create({
            name,
            email,
            subject,
            message
        })
        res.status(201).json({
            status: 201,
            success: true,
            message: 'Added Successfully!',
            data: {
                contactUs
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