const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/login')
const AdminPanelUser = require('../models/adminPanelUsers')

router.post('/',async(res,req)=>{
    const {email,password} = req.body;
    if(!email || !password)
        return res.status(400).json({
            status:400,
            success: false,
            message:"Email and Password is required"
        })
        try{
            user = await AdminPanelUser.findOne({
                email
            })
            if(!user)
                return res.status(400).json({
                    status:400,
                    success: false,
                    message:"Invalid Email or Password "
            })
            if(!(await bcrypt.compare(password, User.password)))
                return res.status(400).json({
                    status:400,
                    success: false,
                    message:"Invalid Email or Password "
            })
            const token = jwt.sign({_id:user.id},process.env.JWT_SECRET)
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