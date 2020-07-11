const mongoose = require('mongoose')

const DemoRequest = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('DemoRequest', DemoRequest)