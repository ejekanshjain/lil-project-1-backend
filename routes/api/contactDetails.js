const express = require('express')

const { checkUserAuthenticated } = require('../../middlewares')
const { ContactDetails } = require('../../models')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const contactDetails = req.query.all === 'true' ? await ContactDetails.find().sort({ createdAt: -1 }) : await ContactDetails.find().sort({ createdAt: -1 }).limit(1)
        res.json({
            status: 200,
            success: true,
            data: {
                contactDetails: req.query.all === 'true' ? contactDetails : contactDetails[0]
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
    const { address, email, contactNumber, linkedin, facebook } = req.body
    if (!address)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Address is required!'
        })
    if (!email)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Wmail is required!'
        })
    if (!contactNumber)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Contact Number is required!'
        })
    if (!linkedin)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Linkedin is required!'
        })
    if (!facebook)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Facebook is required!'
        })
    try {
        const contactDetails = await ContactDetails.create({
            address,
            email,
            contactNumber,
            linkedin,
            facebook
        })
        res.status(201).json({
            status: 201,
            success: true,
            message: 'Added Successfully!',
            data: {
                contactDetails
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