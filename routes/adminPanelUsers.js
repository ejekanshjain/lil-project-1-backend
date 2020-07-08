const express = require('express')

const adminPanelUsers = require('../models/adminPanelUsers')

const router = express.Router()

router.get('/', async function (req, res) {
    try {
        const AdminPanelUsers = await adminPanelUsers.find()
        res.json({ status: 200, data: { AdminPanelUsers } })
    } catch (err) {
        console.log(err)
        res.json({ status: 500, message: 'Something Went Wrong!' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const AdminPanelUsers = await adminPanelUsers.findOne({
            _id: req.params.id
        })
        res.json({ status: 200, data: { AdminPanelUsers } })
    } catch (err) {
        console.log(err)
        res.json({ status: 500, message: 'Somthing Went Wrong!' })
    }
})

router.post('/', async (req, res) => {
    try {
        const AdminPanelUsers = await adminPanelUsers.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.status(201).json({ status: 201, message: 'Added Successfully!', data: { AdminPanelUsers } })
    } catch (err) {
        console.log(err)
        res.json({ status: 500, message: 'Somthing Went Wrong!' })
    }
})

module.exports = router