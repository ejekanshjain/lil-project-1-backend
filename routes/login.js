const express = require('express')
<<<<<<< HEAD
<<<<<<< HEAD
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
=======

=======
const jwt = require('jsonwebtoken')
>>>>>>> d24dff0ea65493112b3b62072d8e64d8f8b30270
const router = express.Router()

router.post('/posts',verifyToken,(res,req)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message:'Post created..',
                authData
            })
        }
    })
    res.json({

    })
})

router.get('/', (req, res) => {
<<<<<<< HEAD
  res.send('LOL')
>>>>>>> df9951ef084f59e8bf4c9db3b82cf9abeb974c02
=======
    const user = {
        id : 1,
        email : 'prernapaliwal80@gmail.com',
        password : 'prerna'
    }
    jwt.sign({user},'secretkey',(err,token)=>{
        res.json({
            token
        })
    })
>>>>>>> d24dff0ea65493112b3b62072d8e64d8f8b30270
})

function verifyToken(req,res,next){
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined'){
        const heads = header.split(' ');
        const headsToken = heads[1];
        req.token = headsToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

module.exports = router