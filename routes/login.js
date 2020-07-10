const express = require('express')
const login = require('../models/login')
const adminPanelUsers = require('../models/adminPanelUsers')

const jwt = require('jsonwebtoken')
const router = express.Router()

// router.post('/posts',verifyToken,(res,req)=>{
//     jwt.verify(req.token,'secretkey',(err,authData)=>{
//         if(err){
//             res.sendStatus(403);
//         }
//         else{
//             res.json({
//                 message:'Post created..',
//                 authData
//             })  
//         }
//     })
// })

// router.post('/', (req, res) => {
    
//     var Login = new login({
//             email: req.params.email,
//             password: req.params.password 
//         })

//     //save user to database
//     Login.save(function(err){
//         if(err) throw err;
    
//     adminPanelUsers.findOne({ email: Login.email })
//     // fetch user and test password verification
//         if (err) throw err;

//     // test a matching password
//         user.comparePassword( Login.password , function(err, isMatch) {
//             if (err) throw err;
//             console.log(Login.password, isMatch); // -> Password123: true
//     });

//     })


//     jwt.sign({password},'secretkey',(err,token)=>{
//         res.json({
//             token
//         })
//     })
// })

// function verifyToken(req,res,next){
//     const header = req.headers['authorization'];

//     if(typeof header !== 'undefined'){
//         const heads = header.split(' ');
//         const headsToken = heads[1];
//         req.token = headsToken;
//         next();
//     }
//     else{
//         res.sendStatus(403);
//     }
// }

// module.exports = router

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

UserSchema.pre(save, function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//module.exports = mongoose.model(User, UserSchema);
