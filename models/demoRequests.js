const mongoose = require('mongoose')

const demoRequestSchema = new mongoose.Schema({
    email: {
        type:String,
        required : true
    },
    message:{
        type : String,
        required : false
    }
},
{
    timestamps:true
}

)

module.exports = mongoose.model('demoRequests', demoRequestSchema)