const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()


const AdminPanelUser = require('../models/adminPanelUsers')

router.post('/',async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
        return res.status(400).json({
            status:400,
            success: false,
            message:"Email and Password is required"
        })
        try{
            const user = await AdminPanelUser.findOne({
                email
            })
            if(!user)
                return res.status(400).json({
                    status:400,
                    success: false,
                    message:"Invalid Email or Password "
            })
            if(!(await bcrypt.compare(password, user.password)))
                return res.status(400).json({
                    status:400,
                    success: false,
                    message:"Invalid Email or Password "
            })
            const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
            res.json({
                status:200,
                success:true,
                data:{
                    user : user,
                    token
                }
            })

        }catch(err){
            console.log(err)
        }
    });

module.exports = router