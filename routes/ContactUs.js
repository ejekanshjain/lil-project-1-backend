const express = require('express')

const ContactUs = require('../models/ContactUs')

const router = express.Router()

router.get('/', async function (req, res) {
    try {
        const contactUs = await ContactUs.find()
        res.json({ status: 200, data: { contactUs } })
    } catch (err) {
        console.log(err)
        res.json({ status: 500, message: 'Somthing Went Wrong!' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const contactUs = await ContactUs.findOne({
            _id: req.params.id
        })
        res.json({ status: 200, data: { contactUs } })
    } catch (err) {
        console.log(err)
        res.json({ status: 500, message: 'Somthing Went Wrong!' })
    }
})

router.post('/', async (req, res) => {
    try {
        const contactUs = await ContactUs.create({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        })
        res.status(201).json({ status: 201, message: 'Added Successfully!', data: { contactUs } })
    } catch (err) {
        console.log(err)
        res.json({ status: 500, message: 'Somthing Went Wrong!' })
    }
})

module.exports = router