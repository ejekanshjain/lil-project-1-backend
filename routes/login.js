const express = require('express')
const bcrypt = require('bcryptjs')

const login = require('../models/login')
const login = require('../models/login')
const users=[]
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
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(salt)
        console.log(hashedPassword)
        const Login = {    email: req.body.email,
            password: req.body.password}
        users.push(Login)
        res.status(201).send() 
    }
    
    catch (err) {
        console.log(err)
        res.status(500).end()
    }
})

router.post('/users/login', async (req, res) => {
    const Login = users.find(Login => Login.email = req.body.email)
    if(Login == null){
        return res.status(400).send('Cannot find user')
    }
    try{
        if( await bcrypt.compare(req.body.password, Login.password)){
           res.send('Success') 
        } else{
            res.send('Not Allowed')
        }
    } catch{
        res.status(500).send()
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