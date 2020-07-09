const express = require('express')
const bcrypt = require('bcryptjs')

const login = require('../models/login')
const login = require('../models/login')

const router = express.Router()

router.get('/', async function (req, res) {
    try {
        const Login = await login.find()
        res.json({ status: 200, data: { Login } })
    } catch (err) {
        console.log(err)
        res.json({ status: 500, message: 'Something Went Wrong!' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const Login = await login.findOne({
            _id: req.params.id
        })
        res.json({ status: 200, data: { Login } })
    } catch (err) {
        console.log(err)
        res.json({ status: 500, message: 'Somthing Went Wrong!' })
    }
})

router.post('/', async (req, res) => {
    try {
        const Login = await login.create({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        })
        res.status(201).json({ status: 201, message: 'Added Successfully!', data: { Login } })
    } catch (err) {
        console.log(err)
        res.json({ status: 500, message: 'Something Went Wrong!' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await login.deleteOne({
            _id: req.params.id
        })
        res.json({ status: 200, message: 'Successfully Deleted' })
    } catch (err) {
        console.log(err)
        res.json({ message: 'Invalid ID!' })
    }
})

module.exports = router