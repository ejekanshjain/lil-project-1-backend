const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/login')

router.post('/',verifyToken,(res,req)=>{
    
    user = User.findOne({email:req.body.email})
    if(user){
        bcrypt.compare(req.body.password, this.password, function(err, isMatch) {
            if (err) return res.json({
                message:"Invalid Password"
            });
            else{
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
            
            
            router.get('/', (req, res) => {
                const user = {
                    id : 1,
                    email : req.body.email,
                    password : req.body.password
                }
                jwt.sign({user},'secretkey',(err,token)=>{
                    res.json({
                        token
                    })
                })
            })
            
            

            }
        })

    
    }

}


    );
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