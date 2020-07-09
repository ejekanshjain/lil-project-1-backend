const express = require('express')
const jwt = require('jsonwebtoken')
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