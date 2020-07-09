const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { AdminPanelUser } = require('../../models')
const { transformUser } = require('../../util')

const router = express.Router()

if (process.env.NODE_ENV !== 'production') {
    router.get('/', async (req, res) => {
        try {
            const users = await AdminPanelUser.find()
            res.json({
                status: 200,
                success: true,
                data: {
                    adminPanelUsers: users.map(transformUser)
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

    router.post('/', async (req, res) => {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Email and Password is required!'
            })
        try {
            await AdminPanelUser.create({
                email,
                password: await bcrypt.hash(password, 10)
            })
            res.status(201).json({
                status: 201,
                success: true,
                message: 'User Added Successfully!'
            })
        } catch (err) {
            if (err.code === 11000)
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'Email already Exists!'
                })
            console.log('\x1b[31m%s\x1b[0m', err)
            res.status(500).json({
                status: 500,
                success: false,
                message: 'Something Went Wrong!'
            })
        }
    })
}

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({
            status: 400,
            success: false,
            message: 'Email and Password is required!'
        })
    try {
        const user = await AdminPanelUser.findOne({
            email
        })

        if (!user)
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Invalid Email or Password!'
            })

        if (!(await bcrypt.compare(password, user.password)))
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Invalid Email or Password!'
            })

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        res.json({
            status: 200,
            success: true,
            data: {
                user: transformUser(user),
                token
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