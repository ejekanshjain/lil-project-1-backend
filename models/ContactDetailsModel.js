const mongoose = require('mongoose')

const ContactDetailsSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('ContactDetails', ContactDetailsSchema)