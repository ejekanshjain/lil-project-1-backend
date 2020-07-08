const express = require('express')

const demoRequests = require('../models/demoRequests')

const router = express.Router()

router.get('/', async function (req, res) {
    try {
        const DemoRequest = await demoRequests.find()
        res.json({ status: 200, data: { DemoRequest } })
    } catch (err) {
        console.log(err)
        res.json({ status: 500, message: 'Somthing Went Wrong!' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const DemoRequest = await demoRequests.findOne({
            _id: req.params.id
        })
        res.json({ status: 200, data: { DemoRequest } })
    } catch (err) {
        console.log(err)
        res.json({ status: 500, message: 'Somthing Went Wrong!' })
    }
})

router.post('/', async (req, res) => {
    try {
        const DemoRequest = await demoRequests.create({
            email: req.body.email,
            message: req.body.message
        })
        res.status(201).json({ status: 201, message: 'Added Successfully!', data: { DemoRequest } })
    } catch (err) {
        console.log(err)
        res.json({ status: 500, message: 'Somthing Went Wrong!' })
    }
})


module.exports = router