const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true
    },
    password:{
        type: String
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('login',loginSchema)